Extensions
----------

### Auth

If you want to use Laravel's native Auth functionality, register this included service provider:

```php
'Jenssegers\Mongodb\Auth\PasswordResetServiceProvider',
```

This service provider will slightly modify the internal DatabaseReminderRepository to add support for MongoDB based password reminders. If you don't use password reminders, you don't have to register this service provider and everything else should work just fine.

### Queues

If you want to use MongoDB as your database backend, change the the driver in `config/queue.php`:

```php
'connections' => [
    'database' => [
        'driver' => 'mongodb',
        'table'  => 'jobs',
        'queue'  => 'default',
        'expire' => 60,
    ],
```

If you want to use MongoDB to handle failed jobs, change the database in `config/queue.php`:

```php
'failed' => [
    'database' => 'mongodb',
    'table'    => 'failed_jobs',
    ],
```

And add the service provider in `config/app.php`: 

```php
Jenssegers\Mongodb\MongodbQueueServiceProvider::class,
```

### Sentry

If you want to use this library with [Sentry](https://cartalyst.com/manual/sentry), then check out https://github.com/jenssegers/Laravel-MongoDB-Sentry

### Sessions

The MongoDB session driver is available in a separate package, check out https://github.com/jenssegers/Laravel-MongoDB-Session
