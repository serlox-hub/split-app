export async function fetchWithHandling(url, options) {
  try {
    const response = await fetch(url, options);

    // Handle non-2xx responses
    if (!response.ok) {
      const errorData = await safeParseJSON(response);
      return {
        success: false,
        status: response.status,
        error: errorData?.message || response.statusText,
      };
    }

    const data = await response.json();
    return {
      success: true,
      data,
    };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
}

async function safeParseJSON(response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}
