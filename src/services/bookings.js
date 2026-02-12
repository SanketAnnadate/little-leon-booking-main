// Simple fake API to simulate network behavior. Exported for testing/mocking.
export async function submitBooking(payload) {
  // Simulate latency
  await new Promise((r) => setTimeout(r, 300))

  // Very small chance of error to exercise error UI
  if (payload?.name?.toLowerCase()?.includes('error')) {
    throw new Error('Server refused this booking. Try a different name.')
  }

  return {
    id: Math.random().toString(36).slice(2),
    ...payload,
  }
}