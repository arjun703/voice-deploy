<?php

namespace App\Models;
use App\Models\questions_table;
use App\Models\UserSurvey;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class responses_table extends Model
{
    use HasFactory;
    protected $table = 'responses';
    protected $fillable = ['surveyId','userId', 'questionId','responseText','numericResponse'];

    // public function question()
    // {
    //     return $this->hasMany(questions_table::class, 'questionId');
    // }

    // public function merchant()
    // {
    //     return $this->belongsTo(merchants_table::class, 'merchantId', 'merchantId');
    // }

    public function question()
    {
        return $this->belongsTo(questions_table::class, 'questionId','questionId');
    }

    public function survey()
    {
        return $this->belongsTo(UserSurvey::class,'surveyId');
    }
}
