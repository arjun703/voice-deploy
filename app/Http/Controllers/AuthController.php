<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\LoginUser;
use App\Models\UserSurvey;
use App\Models\UserSurveyFeedback;
use App\Models\surveyTypes_table;
use App\Models\questions_table;
use App\Models\responses_table;
use App\Models\merchants_table;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class AuthController extends Controller
{
    public function login(Request $request)
{
    $requestData = $request->all();
    $emailColumnName = 'email';
    $passwordColumnName = 'password';

    $hashedPassword = md5($requestData['password']);
    
    $user = LoginUser::where($emailColumnName, $requestData['email'])
        ->first();

    if (!$user) {
        return response()->json(["success" => false, "message" => "Wrong Email or password!"], 401);
    }

    Session::put('userId', $user);
    Session::put('isLoggedIn', true);
    $sess = Session::get('userId');
    

    return response([
        'user' => $user,
        'success' => 'true',
        'message' => 'Login successful'
    ], 200);
}

public function get_session($userData)
{
   
    $user = merchants_table::where('merchantId', $userData)->first();
    return response()->json(['user' => $user]);
}


public function register(Request $request)
{
    $validatedData = $request->validate([
        'merchantId' => 'required',
        'userid' => 'required',
        'survey_name' => 'required',
        'survey_channel' => 'required',
    ]);

    $newUser = UserSurvey::create([
        'merchantId' => $validatedData['merchantId'],
        'user_id' => $validatedData['userid'],
        'survey_name' => $validatedData['survey_name'],
        'survey_channel' => $validatedData['survey_channel'],
        'comment' => $request->input('comment', ''),
        'rating' => $request->input('rating', ''),
        'restaurant_factors' => $request->input('restaurant_factors', ''),
        'surveyTypeId' => $request->input('surveyTypeId'),
    ]);

    $userId = $newUser->id;

    return response([
        'success' => true,
        'message' => 'Survey Created successfully',
        'user_id' => $userId,
    ], 200);
}


public function survey_response(Request $request)
{
    
    $validatedData = $request->validate([
        'id' => 'required',
        'dataSurveyId' => 'required',
        'rating' => 'required', 
        'questions1' => 'required'
    ], [
        'questions1.required' => 'This is required field.'
    ]);
    

    $newUser2 = responses_table::create([
        'questionId' => $validatedData['id'],
        'surveyId' => $validatedData['dataSurveyId'], 
        'numericResponse' => $request->input('rating', 0), 
        'responseText' => $request->input('questions1', ''), 
    ]);

    return response([
        'success' => true,
        'message' => 'Feedback data saved successfully'
    ], 200);
}



public function question(Request $request)
{
    $validatedData = $request->validate([
        'questionText' => 'required',
        'createdSurveyId' => 'required',
        'questionType' => 'required|in:Open Ended,MCQ', 
        'mcqSubheading'=>'required'
    ],
    [
        'mcqSubheading.required' => 'This is required field.'
    ]


);

    $mcqSubheading = $request->input("mcqSubheading");
    $subheadingsArray = explode(",", $mcqSubheading);
    
    $outputArray = [];
    foreach ($subheadingsArray as $item) {
        $outputArray[] = [$item];
    }


    if($validatedData['questionType'] == "Open Ended"){
        $jsonData = NULL;
    } else {
        $jsonData = json_encode($outputArray);
    }

    $question = questions_table::create([
        'questionText' => $validatedData['questionText'],
        'surveyId' => $validatedData['createdSurveyId'],
        'mcqSubheading' => $jsonData, 
        'questionType' => $validatedData['questionType']
    ]);


    $recentQuestionId = $question->id;

    return response([
        'success' => true,
        'message' => 'Question data saved successfully',
        'questionId' => $recentQuestionId
    ], 200);
}


public function questions($surveyId){
    $decodedString = base64_decode($surveyId);
    $prefixToRemove = '104voice2';
    $suffixToRemove = '#voice$104';
    if (strpos($decodedString, $prefixToRemove) === 0 && strrpos($decodedString, $suffixToRemove) === strlen($decodedString) - strlen($suffixToRemove)) {
        $decodedString = substr($decodedString, strlen($prefixToRemove));
        $decodedString = substr($decodedString, 0, strlen($decodedString) - strlen($suffixToRemove));
    }

    $questions = questions_table::with(['survey.merchant'])->where('surveyId', $decodedString)->get();
    $allQuestionData = []; 
    foreach ($questions as $question) {
        $mcqSubheading = json_decode($question->mcqSubheading);
        $questionData = [
            'questionId' => $question->questionId,
            'questionText' => $question->questionText,
            'questionType' => $question->questionType,
            'mcqSubHeading' => $mcqSubheading,
            'id' => $question->survey->id,
            'survey_name' => $question->survey->survey_name,
            'merchantId' => $question->survey->merchant->merchantId,
            'merchantName' => $question->survey->merchant->merchantName,
            'user_id'=>$question->survey->user_id
        ];
        $allQuestionData[] = $questionData;
    }
    return response()->json(['questions' => $allQuestionData]);
}

    public function mcqQuestions($questionId){
        $allQuestionData = [];
        $questions = questions_table::where('questionId', $questionId)->first();
        
        $allQuestionData['mcqSubheading']=json_decode($questions->mcqSubheading);
        $allQuestionData['question']=$questions;
        return response()->json(['questionsmcq' => $allQuestionData]);

    }

public function merchant($merchantid){
    
$merchant = merchants_table::where('merchantId', $merchantid)->first();
return response()->json(['merchant' => $merchant]);

} 


// public function displaySurvey($merchantId){
//     $userSurveys = UserSurvey::with(['surveyType','merchant'])->where('merchantId', $merchantId)->get();
//     foreach ($userSurveys as $userSurvey) {
//         $surveyDetails = [
//         'surveyName' => $userSurvey->survey_name,
//         'surveyId' => $userSurvey->id,
//         'surveyChannel' => $userSurvey->survey_channel,
//         'surveyTypeId' => $userSurvey->surveyType->surveyTypeId,
//         'surveyTypeName' => $userSurvey->surveyType->surveyTypeName,
//         'merchantName' => $userSurvey->merchant->merchantName,
//         ];
//         $allSurveyDetails[] = $surveyDetails;
//     }
//     return response()->json(['surveyDetails' => $allSurveyDetails]);
//     }

public function displayResponse($merchantId,$channel = false){

    $decodedString = base64_decode($merchantId);
    $prefixToRemove = '104voice2';
    $suffixToRemove = '#voice$104';
    if (strpos($decodedString, $prefixToRemove) === 0 && strrpos($decodedString, $suffixToRemove) === strlen($decodedString) - strlen($suffixToRemove)) {
        $decodedString = substr($decodedString, strlen($prefixToRemove));
        $decodedString = substr($decodedString, 0, strlen($decodedString) - strlen($suffixToRemove));
    }


    $userSurveys = UserSurvey::with(['surveyType','merchant','question','responses'])->where('merchantId', $decodedString)->get();

    if($channel){
        $wh = where('survey_channel',$channel);
        $userSurveys = UserSurvey::with(['surveyType','merchant','question','responses'])->where('merchantId', $decodedString)
        ->$wh->get();
    }
    
    $allQuestionResponses = [];

    foreach ($userSurveys as $userSurvey) {
        $survey = $userSurvey->surveyType;
        $merchant = $userSurvey->merchant;

        foreach ($userSurvey->responses as $response) {
            $question = $response->question;
            $mcqSubheading = json_decode($question->mcqSubheading);
            $allQuestionResponses[] = [
                'surveyName' => $userSurvey->survey_name,
                'surveyChannel' => $userSurvey->survey_channel,
                'questionId' => $question->questionId,
                'questionText' => $question->questionText,
                'questionType'=>$question->questionType,
                'numericResponse' => $response->numericResponse,
                'responseText' => $response->responseText,
                'surveyTypeId' => $survey->surveyTypeId,
                'mcqSubheading' => $mcqSubheading,
                // 'userSurvey' => [
                //     'id' => $userSurvey->id,
                // ]
            ];
        }
    }
    return response()->json(['responseDetails' => $allQuestionResponses]);
}


    
    public function displayQuestions($questionId) {
        $userSurveys = DB::table('responses')
            ->select('responseText', DB::raw('COUNT(*) as count'))
            ->where('questionId', $questionId)
            ->groupBy('responseText')
            ->orderByDesc('count')
            ->get();
    
        $allData = [];
    
        foreach ($userSurveys as $question) {
            $allData[] = [
                'questionText' => $question->responseText,
                'count' => $question->count,
            ];
        }
    
        return response()->json(['questionData' => $allData]);
    }
    
    

    public function displayResponseByMonth($merchantId) {

    $decodedString = base64_decode($merchantId);
    $prefixToRemove = '104voice2';
    $suffixToRemove = '#voice$104';
    if (strpos($decodedString, $prefixToRemove) === 0 && strrpos($decodedString, $suffixToRemove) === strlen($decodedString) - strlen($suffixToRemove)) {
        $decodedString = substr($decodedString, strlen($prefixToRemove));
        $decodedString = substr($decodedString, 0, strlen($decodedString) - strlen($suffixToRemove));
    }
        $currentYear = date('Y');
        
        $resarr['userSurveys1'] = DB::table('responses AS r')
        ->join('merchant_surveys AS ms', 'r.surveyId', '=', 'ms.id')
        ->join('merchants AS m', 'ms.merchantId', '=', 'm.merchantId')
        ->select(DB::raw('COUNT(*) AS count'), DB::raw('MONTH(r.created_at) AS month'))
        ->where('r.numericResponse', '>=', 1)
        ->where('r.numericResponse', '<=', 5)
        ->where('m.merchantId', $decodedString)
        ->groupBy(DB::raw('MONTH(r.created_at)'))
        ->get();


        $resarr['userSurveys2'] = DB::table('responses AS r')
        ->join('merchant_surveys AS ms', 'r.surveyId', '=', 'ms.id')
        ->join('merchants AS m', 'ms.merchantId', '=', 'm.merchantId')
        ->select(DB::raw('COUNT(*) AS count'), DB::raw('MONTH(r.created_at) AS month'))
        ->where('r.numericResponse', '>=', 6)
        ->where('r.numericResponse', '<=', 7)
        ->where('m.merchantId', $decodedString)
        ->groupBy(DB::raw('MONTH(r.created_at)'))
        ->get();


        $resarr['userSurveys3'] = DB::table('responses AS r')
        ->join('merchant_surveys AS ms', 'r.surveyId', '=', 'ms.id')
        ->join('merchants AS m', 'ms.merchantId', '=', 'm.merchantId')
        ->select(DB::raw('COUNT(*) AS count'), DB::raw('MONTH(r.created_at) AS month'))
        ->where('r.numericResponse', '>=', 8)
        ->where('r.numericResponse', '<=', 11)
        ->where('m.merchantId', $decodedString)
        ->groupBy(DB::raw('MONTH(r.created_at)'))
        ->get();



        // SELECT COUNT(*) AS count, MONTH(r.created_at) AS month FROM responses AS r JOIN merchant_surveys AS ms ON r.surveyId = ms.id JOIN merchants AS m ON ms.merchantId = m.merchantId WHERE r.numericResponse != 0 AND r.numericResponse > 5 AND m.merchantId = 1 GROUP BY month;

    
        return response()->json(['monthWiseData' => $resarr]);
    }

public function dateFilter(Request $request)
    {
    $startDate = $request->query('startDate');
    $endDate = $request->query('endDate');
    $merchantId = $request->query('merchantId');

    $endDateCarbon = Carbon::parse($endDate);
    $endDateCarbon->addDay();

    $data = responses_table::select('responses.*')
    ->join('merchant_surveys', 'responses.surveyId', '=', 'merchant_surveys.id')
    ->where('merchant_surveys.merchantId', $merchantId)
    // ->whereBetween(DB::raw('DATE(responses.created_at)'), [$startDate, $endDate])
    ->whereDate('responses.created_at', '>=', $startDate)
    ->whereDate('responses.created_at', '<', $endDateCarbon)
    ->get();





    $allQuestionResponses = [];

    foreach ($data as $response) {
        $question = $response->question;
        $survey = $response->survey;
        $mcqSubheading = json_decode($question->mcqSubheading);
        $allQuestionResponses[] = [
            'surveyName' => $survey->survey_name,
            'surveyChannel' => $survey->survey_channel,
            'questionId' => $question->questionId,
            'questionText' => $question->questionText,
            'questionType' => $question->questionType,

            'numericResponse' => $response->numericResponse,
            'responseText' =>$response->responseText,
            'mcqSubheading' => ($mcqSubheading !== null && $mcqSubheading !== "") ? $mcqSubheading : "null"
        ];
    }

    return response()->json($allQuestionResponses);
}


public function filterChannel(Request $request) {
$channel = $request->query('option');
$allChannel = $request->query('options');
$channelArray = explode(',', $channel);
$merchantId = $request->query('merchantId');

if (in_array("all", $channelArray)) {
    $userSurveys = UserSurvey::with(['surveyType', 'merchant', 'question', 'responses'])
        ->where('merchantId', $merchantId)
        ->get();
} else {
    // If specific options are selected, filter user surveys based on those options
    if (!empty($channelArray)) {
        $userSurveys = UserSurvey::with(['surveyType', 'merchant', 'question', 'responses'])
            ->where('merchantId', $merchantId)
            ->whereIn('survey_channel', $channelArray)
            ->get();
    } else {
        $userSurveys = collect();
    }
}

    $allQuestionResponses = [];

    foreach ($userSurveys as $userSurvey) {
        $survey = $userSurvey->surveyType;
        $merchant = $userSurvey->merchant;

        foreach ($userSurvey->responses as $response) {
            $question = $response->question;
            $mcqSubheading = json_decode($question->mcqSubheading);
            $allQuestionResponses[] = [
                'surveyName' => $userSurvey->survey_name,
                'surveyChannel' => $userSurvey->survey_channel,
                'questionId' => $question->questionId,
                'questionType'=>$question->questionType,
                'questionText' => $question->questionText,
                'numericResponse' => $response->numericResponse,
                'responseText' => $response->responseText,
                'surveyTypeId' => $survey->surveyTypeId,
                'mcqSubheading' => $mcqSubheading ? $mcqSubheading : "NULL",
            ];
        }
    }

    return response()->json(['responseDetails' => $allQuestionResponses]);
}



public function displayResponseByMonthFilter(Request $request) {

    $startDate = $request->query('startDate');
    $endDate = $request->query('endDate');
    $merchantId = $request->query('merchantId');
    $resarr = [];

    
    $endDateCarbon = Carbon::parse($endDate);
    $endDateCarbon->addDay();

    $resarr['userSurveys1'] = DB::table('responses AS r')
    ->join('merchant_surveys AS ms', 'r.surveyId', '=', 'ms.id')
    ->join('merchants AS m', 'ms.merchantId', '=', 'm.merchantId')
    ->join('merchant_surveys AS s', 'ms.id', '=', 's.id')
    ->select(
        DB::raw('COUNT(*) AS count'),
        'r.surveyId',
        DB::raw('MONTH(r.created_at) AS month'),
        DB::raw('MAX(r.numericResponse) AS rating')
    )
    ->whereDate('r.created_at', '>=', $startDate)
    ->whereDate('r.created_at', '<', $endDateCarbon) 
    ->where('r.numericResponse', '>=', 1)
    ->where('r.numericResponse', '<=', 5)
    ->where('m.merchantId', $merchantId)
    ->groupBy('r.surveyId', DB::raw('MONTH(r.created_at)'))
    ->get();

    $resarr['userSurveys2'] = DB::table('responses AS r')
    ->join('merchant_surveys AS ms', 'r.surveyId', '=', 'ms.id')
    ->join('merchants AS m', 'ms.merchantId', '=', 'm.merchantId')
    ->join('merchant_surveys AS s', 'ms.id', '=', 's.id')
    ->select(
        DB::raw('COUNT(*) AS count'),
        'r.surveyId',
        DB::raw('MONTH(r.created_at) AS month'),
        DB::raw('MAX(r.numericResponse) AS rating')
    )
    ->whereDate('r.created_at', '>=', $startDate)
    ->whereDate('r.created_at', '<', $endDateCarbon)
    ->where('r.numericResponse', '>=', 6)
    ->where('r.numericResponse', '<=', 7)
    ->where('m.merchantId', $merchantId)
    ->groupBy('r.surveyId', DB::raw('MONTH(r.created_at)'))
    ->get();

    $resarr['userSurveys3'] =  DB::table('responses AS r')
    ->join('merchant_surveys AS ms', 'r.surveyId', '=', 'ms.id')
    ->join('merchants AS m', 'ms.merchantId', '=', 'm.merchantId')
    ->join('merchant_surveys AS s', 'ms.id', '=', 's.id')
    ->select(
        DB::raw('COUNT(*) AS count'),
        'r.surveyId',
        DB::raw('MONTH(r.created_at) AS month'),
        DB::raw('MAX(r.numericResponse) AS rating')
    )
    ->whereDate('r.created_at', '>=', $startDate)
    ->whereDate('r.created_at', '<', $endDateCarbon) 
    ->where('r.numericResponse', '>=', 8)
    ->where('r.numericResponse', '<=', 11)
    ->where('m.merchantId', $merchantId)
    ->groupBy('r.surveyId', DB::raw('MONTH(r.created_at)'))
    ->get();
    
    return response()->json(['monthWiseData' => $resarr]);
}

public function displayResponseByMonthFilterCheckBox(Request $request) {

    $channel = $request->query('option');
    $channelArray = explode(',', $channel);
    $merchantId = $request->query('merchantId');
    // dd($channelArray);
    $resarr = [];

    if (in_array("all", $channelArray)) {

    $resarr['userSurveys1'] = DB::table('responses AS r')
    ->join('merchant_surveys AS ms', 'r.surveyId', '=', 'ms.id')
    ->join('merchants AS m', 'ms.merchantId', '=', 'm.merchantId')
    ->join('merchant_surveys AS s', 'ms.id', '=', 's.id')
    ->select(
        DB::raw('COUNT(*) AS count'), 
        'r.surveyId', 
        DB::raw('MONTH(r.created_at) AS month'), 
        DB::raw('MAX(r.numericResponse) AS rating')
    )
    ->where('m.merchantId', $merchantId)
    ->where('r.numericResponse', '>=', 1)
    ->where('r.numericResponse', '<=', 5)
    ->groupBy('r.surveyId', DB::raw('MONTH(r.created_at)'))
    ->get();

    $resarr['userSurveys2'] = DB::table('responses AS r')
    ->join('merchant_surveys AS ms', 'r.surveyId', '=', 'ms.id')
    ->join('merchants AS m', 'ms.merchantId', '=', 'm.merchantId')
    ->join('merchant_surveys AS s', 'ms.id', '=', 's.id')
    ->select(
        DB::raw('COUNT(*) AS count'), 
        'r.surveyId', 
        DB::raw('MONTH(r.created_at) AS month'), 
        DB::raw('MAX(r.numericResponse) AS rating')
    ) 
    ->where('m.merchantId', $merchantId)
    ->where('r.numericResponse', '>=', 6)
    ->where('r.numericResponse', '<=', 7)
    ->groupBy('r.surveyId', DB::raw('MONTH(r.created_at)'))
    ->get();

    $resarr['userSurveys3'] = DB::table('responses AS r')
    ->join('merchant_surveys AS ms', 'r.surveyId', '=', 'ms.id')
    ->join('merchants AS m', 'ms.merchantId', '=', 'm.merchantId')
    ->join('merchant_surveys AS s', 'ms.id', '=', 's.id')
    ->select(
        DB::raw('COUNT(*) AS count'), 
        'r.surveyId', 
        DB::raw('MONTH(r.created_at) AS month'), 
        DB::raw('MAX(r.numericResponse) AS rating')
    )
    ->where('m.merchantId', $merchantId)
    ->where('r.numericResponse', '>=', 8)
    ->where('r.numericResponse', '<=', 10)
    ->groupBy('r.surveyId', DB::raw('MONTH(r.created_at)'))
    ->get();

        }else{
    $resarr['userSurveys1'] = DB::table('responses AS r')
    ->join('merchant_surveys AS ms', 'r.surveyId', '=', 'ms.id')
    ->join('merchants AS m', 'ms.merchantId', '=', 'm.merchantId')
    ->join('merchant_surveys AS s', 'ms.id', '=', 's.id')
    ->select(
        DB::raw('COUNT(*) AS count'), 
        'r.surveyId', 
        DB::raw('MONTH(r.created_at) AS month'), 
        DB::raw('MAX(r.numericResponse) AS rating')
    )
    ->whereIn('s.survey_channel', $channelArray) 
    ->where('r.numericResponse', '>=', 1)
    ->where('r.numericResponse', '<=', 5)
    ->where('m.merchantId', $merchantId)
    
    ->groupBy('r.surveyId', DB::raw('MONTH(r.created_at)'))
    ->get();

    $resarr['userSurveys2'] = DB::table('responses AS r')
    ->join('merchant_surveys AS ms', 'r.surveyId', '=', 'ms.id')
    ->join('merchants AS m', 'ms.merchantId', '=', 'm.merchantId')
    ->join('merchant_surveys AS s', 'ms.id', '=', 's.id')
    ->select(
        DB::raw('COUNT(*) AS count'), 
        'r.surveyId', 
        DB::raw('MONTH(r.created_at) AS month'), 
        DB::raw('MAX(r.numericResponse) AS rating')
    )
    ->whereIn('s.survey_channel', $channelArray) 
    ->where('r.numericResponse', '>=', 6)
    ->where('r.numericResponse', '<=', 7)
    ->where('m.merchantId', $merchantId)
    ->groupBy('r.surveyId', DB::raw('MONTH(r.created_at)'))
    ->get();

    $resarr['userSurveys3'] = DB::table('responses AS r')
    ->join('merchant_surveys AS ms', 'r.surveyId', '=', 'ms.id')
    ->join('merchants AS m', 'ms.merchantId', '=', 'm.merchantId')
    ->join('merchant_surveys AS s', 'ms.id', '=', 's.id')
    ->select(
        DB::raw('COUNT(*) AS count'), 
        'r.surveyId', 
        DB::raw('MONTH(r.created_at) AS month'), 
        DB::raw('MAX(r.numericResponse) AS rating')
    )
    ->whereIn('s.survey_channel', $channelArray) 
    ->where('r.numericResponse', '>=', 8)
    ->where('r.numericResponse', '<=', 10)
    ->where('m.merchantId', $merchantId)
    ->groupBy('r.surveyId', DB::raw('MONTH(r.created_at)'))
    ->get();
    }

    return response()->json(['monthWiseData' => $resarr]);
}
}


