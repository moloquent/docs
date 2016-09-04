Eloquent
--------

This package includes a MongoDB enabled Eloquent class that you can use to define models for corresponding collections.

```php
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class User extends Eloquent {}
```

Note that we did not tell Eloquent which collection to use for the `User` model. Just like the original Eloquent, the lower-case, plural name of the class will be used as the table name unless another name is explicitly specified. You may specify a custom collection (alias for table) by defining a `collection` property on your model:

```php
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class User extends Eloquent {

    protected $collection = 'users_collection';

}
```

**NOTE:** Eloquent will also assume that each collection has a primary key column named id. You may define a `primaryKey` property to override this convention. Likewise, you may define a `connection` property to override the name of the database connection that should be used when utilizing the model.

```php
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class MyModel extends Eloquent {

    protected $connection = 'mongodb';

}
```

Everything else (should) work just like the original Eloquent model. Read more about the Eloquent on http://laravel.com/docs/eloquent

### Optional: Alias

You may also register an alias for the MongoDB model by adding the following to the alias array in `app/config/app.php`:

```php
'Moloquent'       => 'Jenssegers\Mongodb\Eloquent\Model',
```

This will allow you to use the registered alias like:

```php
class MyModel extends Moloquent {}
```
