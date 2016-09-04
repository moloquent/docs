Installation
------------

Make sure you have the MongoDB PHP driver installed. You can find installation instructions at http://php.net/manual/en/mongodb.installation.php

**WARNING**: The old mongo PHP driver is not supported anymore in versions >= 3.0.

Installation using composer:

```
composer require jenssegers/mongodb
```

### Laravel version Compatibility

 Laravel  | Package
:---------|:----------
 4.2.x    | 2.0.x
 5.0.x    | 2.1.x
 5.1.x    | 2.2.x or 3.0.x
 5.2.x    | 2.3.x or 3.0.x
 5.3.x    | 3.1.x

And add the service provider in `config/app.php`:

```php
Jenssegers\Mongodb\MongodbServiceProvider::class,
```

For usage with [Lumen](http://lumen.laravel.com), add the service provider in `bootstrap/app.php`. In this file, you will also need to enable Eloquent. You must however ensure that your call to `$app->withEloquent();` is **below** where you have registered the `MongodbServiceProvider`:

```php
$app->register('Jenssegers\Mongodb\MongodbServiceProvider');

$app->withEloquent();
```

The service provider will register a mongodb database extension with the original database manager. There is no need to register additional facades or objects. When using mongodb connections, Laravel will automatically provide you with the corresponding mongodb objects.

For usage outside Laravel, check out the [Capsule manager](https://github.com/illuminate/database/blob/master/README.md) and add:

```php
$capsule->getDatabaseManager()->extend('mongodb', function($config)
{
    return new Jenssegers\Mongodb\Connection($config);
});
```


Upgrading
---------

#### Upgrading from version 2 to 3

In this new major release which supports the new mongodb PHP extension, we also moved the location of the Model class and replaced the MySQL model class with a trait.

Please change all `Jenssegers\Mongodb\Model` references to `Jenssegers\Mongodb\Eloquent\Model` either at the top of your model files, or your registered alias.

```php
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class User extends Eloquent {}
```

If you are using hybrid relations, your MySQL classes should now extend the original Eloquent model class `Illuminate\Database\Eloquent\Model` instead of the removed `Jenssegers\Eloquent\Model`. Instead use the new `Jenssegers\Mongodb\Eloquent\HybridRelations` trait. This should make things more clear as there is only one single model class in this package.

```php
use Jenssegers\Mongodb\Eloquent\HybridRelations;

class User extends Eloquent {

    use HybridRelations;

    protected $connection = 'mysql';

}
```

Embedded relations now return an `Illuminate\Database\Eloquent\Collection` rather than a custom Collection class. If you were using one of the special methods that were available, convert them to Collection operations.

```php
$books = $user->books()->sortBy('title');
```