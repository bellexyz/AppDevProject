<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
</head>
<body>
    <p>Please click the following link to verify your email:</p>
    <a href="{{ route('verify.email', ['token' => $verificationToken]) }}">Verify Email</a>

    <!-- Resend Button 
    <form action="{{ route('resend.verification.email') }}" method="post">
        @csrf
        <button type="submit">Resend Verification Email</button>
    </form> -->
</body>
</html>
