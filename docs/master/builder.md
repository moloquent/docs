Query Builder
-------------

The database driver plugs right into the original query builder. When using mongodb connections, you will be able to build fluent queries to perform database operations. For your convenience, there is a `collection` alias for `table` as well as some additional mongodb specific operators/operations.

```php
$users = DB::collection('users')->get();

$user = DB::collection('users')->where('name', 'John')->first();
```

If you did not change your default database connection, you will need to specify it when querying.

```php
$user = DB::connection('mongodb')->collection('users')->get();
```

Read more about the query builder on http://laravel.com/docs/queries
