

### Raw Expressions

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
