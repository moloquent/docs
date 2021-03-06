### Schema

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

All other (unsupported) operations are implemented as dummy pass-through methods, because MongoDB does not use a predefined schema.
Read more about the schema builder on [http://laravel.com/docs/schema](http://laravel.com/docs/schema)


### Dates

Eloquent allows you to work with Carbon/DateTime objects instead of MongoDate objects. Internally, these dates will be converted to MongoDate objects when saved to the database.
If you wish to use this functionality on non-default date fields you will need to manually specify them as described here: [http://laravel.com/docs/eloquent#date-mutators](http://laravel.com/docs/eloquent#date-mutators)

Example:

```php
use Moloquent\Eloquent\Model as Eloquent;

class User extends Eloquent {

    protected $dates = ['birthday'];

}
```

Which allows you to execute queries like:

```php
$users = User::where('birthday', '>', new DateTime('-18 years'))->get();
```



### Soft deleting

When soft deleting a model, it is not actually removed from your database. Instead, a `deleted_at` timestamp is set on the record.
To enable soft deletes for a model, apply the `SoftDeletes` Trait to the model:

```php
use Moloquent\Eloquent\SoftDeletes;

class User extends Eloquent {

    use SoftDeletes;

    protected $dates = ['deleted_at'];

}
```

For more information check http://laravel.com/docs/eloquent#soft-deleting

### Query Builder

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

#### Raw Expressions

You can also perform raw expressions on the internal MongoCollection object. If this is executed on the model class, it will return a collection of models. If this is executed on the query builder, it will return the original response.

```php
// Returns a collection of User models.
$models = User::raw(function($collection)
{
    return $collection->find();
});

// Returns the original MongoCursor.
$cursor = DB::collection('users')->raw(function($collection)
{
    return $collection->find();
});
```

Optional: if you don't pass a closure to the raw method, the internal MongoCollection object will be accessible:

```php
$model = User::raw()->findOne(['age' => array('$lt' => 18]));
```

The internal MongoClient and MongoDB objects can be accessed like this:

```php
$client = DB::getMongoClient();
$db = DB::getMongoDB();
```

#### Query Caching

You may easily cache the results of a query using the remember method:

```php
$users = User::remember(10)->get();
```

*From: http://laravel.com/docs/queries#caching-queries*

#### Query Logging

By default, Laravel keeps a log in memory of all queries that have been run for the current request. However, in some cases, such as when inserting a large number of rows, this can cause the application to use excess memory. To disable the log, you may use the `disableQueryLog` method:

```php
DB::connection()->disableQueryLog();
```

*From: http://laravel.com/docs/database#query-logging*

#### Order By

```php
$users = User::orderBy('name', 'desc')->get();
```

#### Offset & Limit

```php
$users = User::skip(10)->take(5)->get();
```

#### Distinct

Distinct requires a field for which to return the distinct values.

```php
$users = User::distinct()->get(['name']);
// or
$users = User::distinct('name')->get();
```

Distinct can be combined with **where**:

```php
$users = User::where('active', true)->distinct('name')->get();
```

#### Group By

Selected columns that are not grouped will be aggregated with the $last function.

```php
$users = Users::groupBy('title')->get(['title', 'name']);
```

#### Aggregation

```php
$total = Order::count();
$price = Order::max('price');
$price = Order::min('price');
$price = Order::avg('price');
$total = Order::sum('price');
```

Aggregations can be combined with **where**:

```php
$sold = Orders::where('sold', true)->sum('price');
```

### MongoDB specific operations

#### Cursor timeout

To prevent MongoCursorTimeout exceptions, you can manually set a timeout value that will be applied to the cursor:

```php
DB::collection('users')->timeout(-1)->get();
```

#### Upsert

Update or insert a document. Additional options for the update method are passed directly to the native update method.

```php
DB::collection('users')->where('name', 'John')
                       ->update($data, ['upsert' => true]);
```

#### Projections

You can apply projections to your queries using the `project` method.

```php
DB::collection('items')->project(['tags' => array('$slice' => 1]))->get();
```

#### Projections with Pagination

```php
$limit = 25;
$projections = ['id', 'name'];
DB::collection('items')->paginate($limit, $projections);
```


#### Push

Add an items to an array.

```php
DB::collection('users')->where('name', 'John')->push('items', 'boots');
DB::collection('users')->where('name', 'John')->push('messages', ['from' => 'Jane Doe', 'message' => 'Hi John']);
```

If you don't want duplicate items, set the third parameter to `true`:

```php
DB::collection('users')->where('name', 'John')->push('items', 'boots', true);
```

#### Pull

Remove an item from an array.

```php
DB::collection('users')->where('name', 'John')->pull('items', 'boots');
DB::collection('users')->where('name', 'John')->pull('messages', ['from' => 'Jane Doe', 'message' => 'Hi John']);
```

#### Unset

Remove one or more fields from a document.

```php
DB::collection('users')->where('name', 'John')->unset('note');
```

You can also perform an unset on a model.

```php
$user = User::where('name', 'John')->first();
$user->unset('note');
```


#### Incrementing or decrementing

Perform increments or decrements (default 1) on specified attributes:

```php
User::where('name', 'John Doe')->increment('age');
User::where('name', 'Jaques')->decrement('weight', 50);
```

The number of updated objects is returned:

```php
$count = User->increment('age');
```

You may also specify additional columns to update:

```php
User::where('age', '29')->increment('age', 1, ['group' => 'thirty something']);
User::where('bmi', 30)->decrement('bmi', 1, ['category' => 'overweight']);
```
