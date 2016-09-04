### Queues

And add the service provider in `config/app.php`: 

```php
Moloquent\MongodbQueueServiceProvider::class,
```

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
