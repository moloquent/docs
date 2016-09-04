### Dates

Eloquent allows you to work with Carbon/DateTime objects instead of MongoDate objects. Internally, these dates will be converted to MongoDate objects when saved to the database. If you wish to use this functionality on non-default date fields you will need to manually specify them as described here: http://laravel.com/docs/eloquent#date-mutators

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

### Order By

```php
$users = User::orderBy('name', 'desc')->get();
```

### Offset & Limit

```php
$users = User::skip(10)->take(5)->get();
```

### Distinct

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

### Group By

Selected columns that are not grouped will be aggregated with the $last function.

```php
$users = Users::groupBy('title')->get(['title', 'name']);
```

### Aggregation

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


### Incrementing or decrementing

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

### Soft deleting

When soft deleting a model, it is not actually removed from your database. Instead, a deleted_at timestamp is set on the record. To enable soft deletes for a model, apply the SoftDeletingTrait to the model:

```php
use Moloquent\Eloquent\SoftDeletes;

class User extends Eloquent {

    use SoftDeletes;

    protected $dates = ['deleted_at'];

}
```

For more information check http://laravel.com/docs/eloquent#soft-deleting

### Query Caching

You may easily cache the results of a query using the remember method:

```php
$users = User::remember(10)->get();
```

*From: http://laravel.com/docs/queries#caching-queries*

### Query Logging

By default, Laravel keeps a log in memory of all queries that have been run for the current request. However, in some cases, such as when inserting a large number of rows, this can cause the application to use excess memory. To disable the log, you may use the `disableQueryLog` method:

```php
DB::connection()->disableQueryLog();
```

*From: http://laravel.com/docs/database#query-logging*
