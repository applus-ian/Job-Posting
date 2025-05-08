# Facebook Login Integration Guide

This guide explains how to set up Facebook OAuth for the application.

## Backend Setup

1. **Update Environment Variables**

   Add the following variables to your `.env` file in the `backend` folder:

   ```
   FACEBOOK_CLIENT_ID=your_facebook_app_id
   FACEBOOK_CLIENT_SECRET=your_facebook_app_secret
   FACEBOOK_REDIRECT_URI=http://localhost:8000/auth/facebook/callback
   ```

2. **Register a Facebook App**

   - Go to [Facebook Developers](https://developers.facebook.com/)
   - Create a new app or use an existing one
   - Set up Facebook Login product
   - In Facebook Login settings, add the following OAuth Redirect URI:
     `http://localhost:8000/auth/facebook/callback`
   - Get your App ID and App Secret from the app's basic settings

## Configuration Verification

1. **Check Laravel Socialite**
   
   The application already uses Laravel Socialite for social login. The SocialAuthController is already configured to handle both Google and Facebook authentication.

2. **Database Setup**
   
   The User model already has a `facebook_id` field which will store the Facebook user ID.

## Testing the Integration

1. Start your Laravel backend server:
   ```
   cd backend
   php artisan serve
   ```

2. Start your Next.js frontend:
   ```
   cd frontend
   npm run dev
   ```

3. Navigate to the login page and click the "Sign in with Facebook" button.

4. You should be redirected to Facebook for authentication.

## Troubleshooting

- Make sure both your frontend and backend servers are running
- Check that your Facebook App is properly configured with the correct redirect URI
- Verify that your app is in Development Mode or has been approved by Facebook for public use
- Check Laravel logs if there are any issues during authentication 