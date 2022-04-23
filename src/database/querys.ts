export const subscriptionQuerys = {
  getAllSubscriptions: 'SELECT email FROM subscriptions',
  checkSubscriptionByEmail: 'SELECT * FROM subscriptions WHERE email = @email',
  addNewSubscription: 'INSERT INTO subscriptions (email) VALUES (@email)',
  deleteSubscription: 'DELETE FROM subscriptions WHERE email = @email',
}
