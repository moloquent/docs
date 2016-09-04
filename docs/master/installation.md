Installation
------------

Make sure you have the MongoDB PHP driver installed.
You can find installation instructions at http://php.net/manual/en/mongodb.installation.php.

Installation using composer:

```bash
composer require moloquent/moloquent
```

### Laravel version Compatibility

 Laravel  | Package
:---------|:----------
 5.1.x    | >= 3.0
 5.2.x    | >= 3.0
 5.3.x    | >= 3.1

And add the service provider in `config/app.php`:

```php
Moloquent\MongodbServiceProvider::class,
```

For usage with [Lumen](http://lumen.laravel.com), add the service provider in `bootstrap/app.php`. In this file, you will also need to enable Eloquent. You must however ensure that your call to `$app->withEloquent();` is **below** where you have registered the `MongodbServiceProvider`:

```php
$app->register('Moloquent\MongodbServiceProvider');

$app->withEloquent();
```

The service provider will register a mongodb database extension with the original database manager. There is no need to register additional facades or objects. When using mongodb connections, Laravel will automatically provide you with the corresponding mongodb objects.

For usage outside Laravel, check out the [Capsule manager](https://github.com/illuminate/database/blob/master/README.md) and add:

```php
$capsule->getDatabaseManager()->extend('mongodb', function($config)
{
    return new \Moloquent\Connection($config);
});
```

Configuration
-------------

Change your default database connection name in `app/config/database.php`:

```php
'default' => env('DB_CONNECTION', 'mongodb'),
```

And add a new mongodb connection:

```php
'mongodb' => [
    'driver'   => 'mongodb',
    'host'     => env('DB_HOST', 'localhost'),
    'port'     => env('DB_PORT', 27017),
    'database' => env('DB_DATABASE'),
    'username' => env('DB_USERNAME'),
    'password' => env('DB_PASSWORD'),
    'options' => [
        'database' => 'admin' // sets the authentication database required by mongo 3
    ]
],
```

You can connect to multiple servers or replica sets with the following configuration:

```php
'mongodb' => [
    'driver'   => 'mongodb',
    'host'     => ['server1', 'server2'],
    'port'     => env('DB_PORT', 27017),
    'database' => env('DB_DATABASE'),
    'username' => env('DB_USERNAME'),
    'password' => env('DB_PASSWORD'),
    'options'  => ['replicaSet' => 'replicaSetName']
],
```