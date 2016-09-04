Supported relations are:

 - hasOne
 - hasMany
 - belongsTo
 - belongsToMany
 - embedsOne
 - embedsMany

Example:

```php
use Moloquent\Eloquent\Model as Eloquent;

class User extends Eloquent {

    public function items()
    {
        return $this->hasMany('Item');
    }

}
```

And the inverse relation:

```php
use Moloquent\Eloquent\Model as Eloquent;

class Item extends Eloquent {

    public function user()
    {
        return $this->belongsTo('User');
    }

}
```

The belongsToMany relation will not use a pivot "table", but will push id's to a __related_ids__ attribute instead. This makes the second parameter for the belongsToMany method useless. If you want to define custom keys for your relation, set it to `null`:

```php
use Moloquent\Eloquent\Model as Eloquent;

class User extends Eloquent {

    public function groups()
    {
        return $this->belongsToMany('Group', null, 'user_ids', 'group_ids');
    }

}
```


Other relations are not yet supported, but may be added in the future. Read more about these relations on http://laravel.com/docs/eloquent#relationships

#### EmbedsMany Relations

If you want to embed models, rather than referencing them, you can use the `embedsMany` relation. This relation is similar to the `hasMany` relation, but embeds the models inside the parent object.

**REMEMBER**: these relations return Eloquent collections, they don't return query builder objects!

```php
use Moloquent\Eloquent\Model as Eloquent;

class User extends Eloquent {

    public function books()
    {
        return $this->embedsMany('Book');
    }

}
```

You access the embedded models through the dynamic property:

```php
$books = User::first()->books;
```

The inverse relation is auto*magically* available, you don't need to define this reverse relation.

```php
$user = $book->user;
```

Inserting and updating embedded models works similar to the `hasMany` relation:

```php
$book = new Book(['title' => 'A Game of Thrones']);

$user = User::first();

$book = $user->books()->save($book);
// or
$book = $user->books()->create(['title' => 'A Game of Thrones'])
```

You can update embedded models using their `save` method (available since release 2.0.0):

```php
$book = $user->books()->first();

$book->title = 'A Game of Thrones';

$book->save();
```

You can remove an embedded model by using the `destroy` method on the relation, or the `delete` method on the model (available since release 2.0.0):

```php
$book = $user->books()->first();

$book->delete();
// or
$user->books()->destroy($book);
```

If you want to add or remove an embedded model, without touching the database, you can use the `associate` and `dissociate` methods. To eventually write the changes to the database, save the parent object:

```php
$user->books()->associate($book);

$user->save();
```

Like other relations, embedsMany assumes the local key of the relationship based on the model name. You can override the default local key by passing a second argument to the embedsMany method:

```php
return $this->embedsMany('Book', 'local_key');
```

Embedded relations will return a Collection of embedded items instead of a query builder. Check out the available operations here: https://laravel.com/docs/master/collections

#### EmbedsOne Relations

The embedsOne relation is similar to the EmbedsMany relation, but only embeds a single model.

```php
use Moloquent\Eloquent\Model as Eloquent;

class Book extends Eloquent {

    public function author()
    {
        return $this->embedsOne('Author');
    }

}
```

You access the embedded models through the dynamic property:

```php
$author = Book::first()->author;
```

Inserting and updating embedded models works similar to the `hasOne` relation:

```php
$author = new Author(['name' => 'John Doe']);

$book = Books::first();

$author = $book->author()->save($author);
// or
$author = $book->author()->create(['name' => 'John Doe']);
```

You can update the embedded model using the `save` method (available since release 2.0.0):

```php
$author = $book->author;

$author->name = 'Jane Doe';
$author->save();
```

You can replace the embedded model with a new model like this:

```php
$newAuthor = new Author(['name' => 'Jane Doe']);
$book->author()->save($newAuthor);
```

#### MySQL Relations

If you're using a hybrid MongoDB and SQL setup, you're in luck! The model will automatically return a MongoDB- or SQL-relation based on the type of the related model. Of course, if you want this functionality to work both ways, your SQL-models will need use the `Moloquent\Eloquent\HybridRelations` trait. Note that this functionality only works for hasOne, hasMany and belongsTo relations.

Example SQL-based User model:

```php
use Moloquent\Eloquent\HybridRelations;

class User extends Eloquent {

    use HybridRelations;

    protected $connection = 'mysql';

    public function messages()
    {
        return $this->hasMany('Message');
    }

}
```

And the Mongodb-based Message model:

```php
use Moloquent\Eloquent\Model as Eloquent;

class Message extends Eloquent {

    protected $connection = 'mongodb';

    public function user()
    {
        return $this->belongsTo('User');
    }

}
```