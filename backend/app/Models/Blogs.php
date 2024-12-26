<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blogs extends Model
{
    use HasFactory;

    // If your table name is different from the plural of the model name (e.g., blogs)
    // protected $table = 'your_table_name';

    // Fillable properties (columns you want to allow mass assignment)
    protected $fillable = [
        'title',
        'author',
        'category',
        'excerpt',
        'content',
        'thumbnail',
        'created_at',
        'updated_at'
    ];

    // If you don't want certain columns to be mass assignable, you can blacklist them
    // protected $guarded = ['id'];

    // Optionally, you can add timestamps if you want to handle the created_at and updated_at columns
    public $timestamps = true;

    // You can also define relationships if needed (e.g., a blog has many comments)
    // public function comments()
    // {
    //     return $this->hasMany(Comment::class);
    // }
}
