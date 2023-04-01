/**
 * Check if the fetch succeeds, throw error if it fails
 * @param {Promise} res - the fetch returned
 * @returns {Promise} - fetch information that is guarateed to be success
 */
export async function statusCheck(res) {
  if (!res.ok) {
    let message = await res.json();
    throw new Error(JSON.stringify(message));
  }
  return res;
}
