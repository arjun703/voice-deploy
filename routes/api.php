<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});




Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/feedback', [AuthController::class, 'survey_response']);
Route::get('/session/{userData}', [AuthController::class, 'get_session']);
Route::post('/question', [AuthController::class, 'question']);
Route::get('/surveyTypes', [AuthController::class, 'surveyTypesFetch']);
Route::get('/questions/{surveyId}',[AuthController::class, 'questions']);
Route::get('/questionsmcq/{questionId}',[AuthController::class, 'mcqQuestions']);
Route::get('/merchant/{merchantid}',[AuthController::class,'merchant']);
// Route::get('/displaySurvey/{merchantId}',[AuthController::class,'displaySurvey']);
Route::get('/disResponse/{merchantId}',[AuthController::class,'displayResponse']);
Route::get('/singleQuestions/{questionId}',[AuthController::class,'displayQuestions']);
Route::get('/displayResponseByMonth/{surveyId}',[AuthController::class,'displayResponseByMonth']);
Route::get('/displayResponseByMonthFilter',[AuthController::class,'displayResponseByMonthFilter']);
Route::get('/dateFilter', [AuthController::class, 'dateFilter']);
Route::get('/filterChannel', [AuthController::class, 'filterChannel']);
Route::get('/displayResponseByMonthFilterCheckBox',[AuthController::class,'displayResponseByMonthFilterCheckBox']);


