Moloquent
============================

An **Eloquent** model and Query builder with support for MongoDB, using the original **Laravel** API.  
This library extends the original Laravel classes, so it uses exactly the same methods.  


[![Latest Version](http://img.shields.io/packagist/v/moloquent/moloquent.svg)](https://packagist.org/packages/moloquent/moloquent)
[![Downloads](http://img.shields.io/packagist/dt/moloquent/moloquent.svg)](https://packagist.org/packages/moloquent/moloquent)
[![Build Status](http://img.shields.io/travis/moloquent/moloquent.svg)](https://travis-ci.org/moloquent/moloquent)
[![Coverage Status](http://img.shields.io/coveralls/moloquent/moloquent.svg)](https://coveralls.io/r/moloquent/moloquent?branch=master)

Installation
------------

Make sure you have the MongoDB PHP driver installed.
You can find installation instructions at 
[http://php.net/manual/en/mongo.installation.php](http://php.net/manual/en/mongo.installation.php).
#### Installation using composer

##### Bleeding Edge
We try our best to commit well tested and stable commits to this branch and every commit is already unit tested.
If you want to get always bleeding edge version use this:
```bash
composer require moloquent/moloquent:dev-master
```


##### Stable
```bash
composer require moloquent/moloquent
```



#### For Laravel >= 5.0

Add the service provider in `config/app.php`:

```php
Moloquent\MongodbServiceProvider::class,
```

##### Alias

You may also register an alias for the MongoDB model by adding the following to the alias array in `config/app.php`:

```php
'Moloquent'       => 'Moloquent\Eloquent\Model',
```

This will allow you to use the registered alias like:

```php
class MyModel extends Moloquent {}
```

#### For [Lumen](http://lumen.laravel.com)

Add the service provider in `bootstrap/app.php`. In this file, you will also need to enable Eloquent. You must however ensure that your call to `$app->withEloquent();` is **below** where you have registered the `MongodbServiceProvider`:

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

Change your default database connection name in `config/database.php`:

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
    'use_mongo_id' => false,
    'options' => [
        'db' => 'admin', // Sets the authentication database required by mongo 3
        //['replicaSet' => 'replicaSetName'], // Connect to multiple servers or replica sets
    ]
],
```

Auth
-----

If you want to use Laravel's native Auth functionality, register this included service provider:

```php
Moloquent\Auth\PasswordResetServiceProvider::class,
```

This service provider will slightly modify the internal DatabaseReminderRepository to add support for MongoDB based password reminders. If you don't use password reminders, you don't have to register this service provider and everything else should work just fine.

Queues
------

Add the service provider in `config/app.php`: 

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

Passport
--------
**dev-master only**
In order to use laravel passport with your models, add `PassportServiceProvider` service provider in `config/app.php`: 

```php
Moloquent\Passport\PassportServiceProvider::class,
```
