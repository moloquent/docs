Schema
------

The database driver also has (limited) schema builder support. You can easily manipulate collections and set indexes:

```php
Schema::create('users', function($collection)
{
    $collection->index('name');

    $collection->unique('email');
});
```

Supported operations are:

 - create and drop
 - collection
 - hasCollection
 - index and dropIndex (compound indexes supported as well)
 - unique
 - background, sparse, expire (MongoDB specific)

All other (unsupported) operations are implemented as dummy pass-through methods, because MongoDB does not use a predefined schema. Read more about the schema builder on http://laravel.com/docs/schema
