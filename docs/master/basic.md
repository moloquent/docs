### Eloquent

This package includes a MongoDB enabled Eloquent class that you can use to define models for corresponding collections.

```php
use Moloquent\Eloquent\Model as Eloquent;

class User extends Eloquent {}
```

Note that we did not tell Eloquent which collection to use for the `User` model. Just like the original Eloquent, the lower-case, plural name of the class will be used as the table name unless another name is explicitly specified. You may specify a custom collection (alias for table) by defining a `collection` property on your model:

```php
use Moloquent\Eloquent\Model as Eloquent;

class User extends Eloquent {

    protected $collection = 'users_collection';

}
```

**NOTE:** Eloquent will also assume that each collection has a primary key column named id. You may define a `primaryKey` property to override this convention. Likewise, you may define a `connection` property to override the name of the database connection that should be used when utilizing the model.

```php
use Moloquent\Eloquent\Model as Eloquent;

class MyModel extends Eloquent {

    protected $connection = 'mongodb';

}
```

Everything else (should) work just like the original Eloquent model. Read more about the Eloquent on http://laravel.com/docs/eloquent


#### Retrieving All Models

```php
$users = User::all();
```

#### Retrieving By Primary Key

```php
$user = User::find('517c43667db388101e00000f');
```

### Inserts, updates and deletes

Inserting, updating and deleting records works just like the original Eloquent.

#### Saving a new model

```php
$user = new User;
$user->name = 'John';
$user->save();
```

You may also use the create method to save a new model in a single line:

```php
User::create(['name' => 'John']);
```

#### Updating a model

To update a model, you may retrieve it, change an attribute, and use the save method.

```php
$user = User::first();
$user->email = 'john@foo.com';
$user->save();
```

*There is also support for upsert operations*

#### Deleting a model

To delete a model, simply call the delete method on the instance:

```php
$user = User::first();
$user->delete();
```

Or deleting a model by its key:

```php
User::destroy('517c43667db388101e00000f');
```

For more information about model manipulation, check [Here](http://laravel.com/docs/eloquent#insert-update-delete).

### Wheres

```php
$users = User::where('votes', '>', 100)->take(10)->get();
```

#### Or Statements

```php
$users = User::where('votes', '>', 100)->orWhere('name', 'John')->get();
```

#### And Statements

```php
$users = User::where('votes', '>', 100)->where('name', '=', 'John')->get();
```

#### Where In With An Array

```php
$users = User::whereIn('age', [16, 18, 20])->get();
```

When using `whereNotIn` objects will be returned if the field is non existent. Combine with `whereNotNull('age')` to leave out those documents.

#### Where Between

```php
$users = User::whereBetween('votes', [1, 100])->get();
```

#### Where null

```php
$users = User::whereNull('updated_at')->get();
```

#### Where Like

```php
$user = Comment::where('body', 'like', '%spam%')->get();
```

#### Exists

Matches documents that have the specified field.

```php
User::where('age', 'exists', true)->get();
```

#### All

Matches arrays that contain all elements specified in the query.

```php
User::where('roles', 'all', ['moderator', 'author'])->get();
```

#### Size

Selects documents if the array field is a specified size.

```php
User::where('tags', 'size', 3)->get();
```

#### Regex

Selects documents where values match a specified regular expression.

```php
User::where('name', 'regex', new \MongoDB\BSON\Regex("/.*doe/i"))->get();
```

**NOTE:** you can also use the Laravel regexp operations. These are a bit more flexible and will automatically convert your regular expression string to a `MongoDB\BSON\Regex` object.

```php
User::where('name', 'regexp', '/.*doe/i'))->get();
```

And the inverse:

```php
User::where('name', 'not regexp', '/.*doe/i'))->get();
```

#### Type

Selects documents if a field is of the specified type.
For more information check [Here](http://docs.mongodb.org/manual/reference/operator/query/type/#op._S_type).

```php
User::where('age', 'type', 2)->get();
```

#### Mod

Performs a modulo operation on the value of a field and selects documents with a specified result.

```php
User::where('age', 'mod', [10, 0])->get();
```


#### Complex Wheres

```php
$users = User::where('name', '=', 'John')->orWhere(function($query) {
        $query->where('votes', '>', 100)
              ->where('title', '<>', 'Admin');
    })
    ->get();
```

#### Raw Where

These expressions will be injected directly into the query.

```php
User::whereRaw(['age' => ['$gt' => 30, '$lt' => 40] ])->get();
```

Matches documents that satisfy a JavaScript expression.
For more information check [Here](http://docs.mongodb.org/manual/reference/operator/query/where/#op._S_where).
