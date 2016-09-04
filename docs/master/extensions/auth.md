### Auth

If you want to use Laravel's native Auth functionality, register this included service provider:

```php
'Moloquent\Auth\PasswordResetServiceProvider',
```

This service provider will slightly modify the internal DatabaseReminderRepository to add support for MongoDB based password reminders. If you don't use password reminders, you don't have to register this service provider and everything else should work just fine.