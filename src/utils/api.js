/**
 * API utilities for resume optimization
 */

/**
 * Convert File to base64 string
 * @param {File} file - The file to convert
 * @returns {Promise<string>} Base64 encoded string
 */
export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

/**
 * Send resume optimization request to n8n webhook
 * @param {File} resumeFile - The resume PDF file
 * @param {string} jobDescription - The job description text
 * @returns {Promise<Object>} The optimization results
 */
export const optimizeResume = async (resumeFile, jobDescription) => {
  try {
    // Get webhook URL from environment variables
    const webhookUrl = import.meta.env.VITE_WEBHOOK_URL;
    
    if (!webhookUrl) {
      throw new Error('Webhook URL not configured. Please set VITE_WEBHOOK_URL in your .env file.');
    }

    // Convert file to base64
    const base64Resume = await fileToBase64(resumeFile);

    // Prepare request payload
    const payload = {
      resume: base64Resume,
      resumeName: resumeFile.name,
      jobDescription: jobDescription,
      timestamp: new Date().toISOString()
    };

    // Send POST request
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    }

    const data = await response.json();
    
    console.log('Raw API Response:', data); // Debug log

    // Helper function to ensure array format
    const ensureArray = (value) => {
      if (!value) return [];
      if (Array.isArray(value)) return value;
      if (typeof value === 'string') {
        // Handle string that might be a single bullet or JSON string
        try {
          const parsed = JSON.parse(value);
          return Array.isArray(parsed) ? parsed : [value];
        } catch {
          // If not JSON, treat as single bullet or split by newlines
          return value.includes('\n') ? value.split('\n').filter(b => b.trim()) : [value];
        }
      }
      return [String(value)];
    };

    // Extract optimized bullets from various possible locations
    let optimizedBullets = data.optimized_bullets || data.optimizedBullets || data.output?.optimized_bullets || data.output || [];
    optimizedBullets = ensureArray(optimizedBullets);
    
    // Extract original bullets
    let originalBullets = data.original_bullets || data.originalBullets || data.output?.original_bullets || [];
    originalBullets = ensureArray(originalBullets);
    
    // Extract missing skills
    let missingSkills = data.missing_skills || data.missingSkills || data.output?.missing_skills || [];
    missingSkills = ensureArray(missingSkills);

    // Normalize response to handle both snake_case and camelCase
    const normalizedData = {
      optimizedBullets: optimizedBullets,
      atsScore: data.ats_score || data.atsScore || data.output?.ats_score || 0,
      explanation: data.explanation || data.output?.explanation || 'Analysis complete.',
      // Optional fields for UX enhancements
      originalBullets: originalBullets,
      matchedKeywords: data.matched_keywords_count || data.matched_keywords || data.matchedKeywords || data.output?.matched_keywords_count || data.output?.matched_keywords,
      totalKeywords: data.total_keywords_count || data.total_keywords || data.totalKeywords || data.output?.total_keywords_count || data.output?.total_keywords,
      missingSkills: missingSkills
    };

    console.log('Normalized Data:', normalizedData); // Debug log
    
    // Log breakdown data availability
    if (normalizedData.matchedKeywords !== undefined || normalizedData.totalKeywords !== undefined || normalizedData.missingSkills.length > 0) {
      console.log('✅ ATS Breakdown data available:', {
        matchedKeywords: normalizedData.matchedKeywords,
        totalKeywords: normalizedData.totalKeywords,
        missingSkillsCount: normalizedData.missingSkills.length
      });
    } else {
      console.log('ℹ️ No ATS Breakdown data in response - section will be hidden');
    }

    // Validate response structure
    if (!normalizedData.optimizedBullets || normalizedData.optimizedBullets.length === 0) {
      console.error('Received data:', data);
      throw new Error('No optimized bullets found in response');
    }
    
    if (!normalizedData.atsScore) {
      console.error('Received data:', data);
      throw new Error('No ATS score found in response');
    }

    return normalizedData;
  } catch (error) {
    console.error('Resume optimization error:', error);
    throw error;
  }
};
