



myApp.controller('sportsCtrl', function($scope, $uibModal, $log, $document, $http, $filter, $timeout, $state) {

    //variables
    $scope.betA = false;
    $scope.betE = false;
    $scope.betPrice = 1;
    $scope.betPrice_p = 1;
    $scope.betAmt = [];
    $scope.betAmt[0] = "10000";
    $scope.liveTop = [];
    $scope.PM = [];
    $scope.PMk = [];
    $scope.toPMk = [];
    $scope.CID = [];
    $scope.LS = [];
    $scope.LMK = [];
    $scope.liveMatch = [];
    $scope.liveTop = [];
    $scope.validMKTypeId = [];
    $scope.lm = [];
    $scope.favM = [];
    $scope.MK = [];
    $scope.mTyId = "ALL";
    $scope.MKCAT = [];
    $scope.Fav_mode = false;
    $scope.LMKc = [];

    loadLiveMatchInit();
    loadBlockMatch();
    loadPreMatch();

    // added vars
    $scope.live_mode = ($state.current.name == 'sports.livebet' ? true : false);
    $scope.uiRouterState = $state;


    $scope.toggleShow = function(obj, param) {
        console.log(obj);
        obj[param] = !obj[param];
    }

    // $scope.toggleMatchMode = function(val) {
    //     // $scope.live_mode = !$scope.live_mode;
    //     console.log($state.current);
    //     $scope.live_mode = val;
    // }
    $scope.sample_live_match_stats = [
        {
            id: 'test',
            showme: false
        },
        {
            id: 'test2',
            showme: false
        },
        {
            id: 'test3',
            showme: false
        },
    ]

    $scope.goMatchMarket = function(obj) {
        // alert("show Match");
        console.log(obj);
        $scope.ggcat = obj.SId;
    }

    function loadBlockMatch() {

        $http({
            method: 'GET',
            url: 'http://localhost:8081/LiveSports/GetBlockMatch'
        }).then(function(response) {
            //console.log(JSON.parse(response.data));

        }, function(error) {
            //console.log(error);
        });
    }

    function loadLiveMatchInit() {
        // $http({
        //     method: 'GET',
        //     url: 'http://localhost:8081/LiveSports/GetLiveMatches'
        // }).then(function(response) {
        var data = JSON.parse(live_match_data);
        //console.log(data);
        $scope.LS = [];
        $scope.LMK = [];
        $scope.LMKc = [];


        angular.forEach(data, function(obj, idx) {
            if (obj.Mk !== null && obj.Mk !== undefined && obj.Mk.length > 0) {
                for (var j = 0; j < obj.Mk.length; j++) {
                    $scope.LMKc.push(obj.Mk[j]);
                }
            }
            angular.forEach(obj.Mt, function(obj2, idx2) {

                var mStat = obj.St.filter(function(el) {
                    return el.MId == obj2.Id;
                })
                var mResult = obj.Re.filter(function(el) {
                    return el.MId == obj2.Id;
                })
                var mSelect = obj.Se.filter(function(el) {
                    return el.MId == obj2.Id;
                })

                var HTeamScore = "-";
                var ATeamScore = "-";

                if (mStat !== undefined && mStat !== null && mStat.length > 0) {
                    HTeamScore = mStat[0].Sc.split(':')[0];
                    ATeamScore = mStat[0].Sc.split(':')[1];

                } else {
                    mStat.push({
                        Pe: -1,
                        Sc: "0:0",
                    })
                }
                ;

                if (mResult !== undefined && mResult !== null && mResult.length > 0) {

                    var w1Price = 0;
                    var w2Price = 0;
                    var xPrice = 0;

                    var w1SelId = "-1";
                    var xSelId = "-1";
                    var w2SelId = "-1";


                    for (var i = mSelect.length - 1; i >= 0; i--) {
                        if (mSelect[i].Nm == 'W1') {
                            w1SelId = mSelect[i].Id ;
                            //w1Price = mSelect[i].P ;          
                            w1Price = $filter('number')(mSelect[i].P, 2);

                        } else if (mSelect[i].Nm == 'X') {
                            xSelId = mSelect[i].Id ;
                            //xPrice = mSelect[i].P ;               
                            xPrice = $filter('number')(mSelect[i].P, 2);

                        } else if (mSelect[i].Nm == 'W2') {
                            w2SelId = mSelect[i].Id ;
                            //w2Price = mSelect[i].P ;
                            w2Price = $filter('number')(mSelect[i].P, 2);
                        }
                    }
                    ;

                    $scope.LS.push({
                        SId: obj2.SId,
                        SN: obj2.SN,
                        RId: obj2.RId,
                        RN: obj2.RN,
                        CId: obj2.CId,
                        CN: obj2.CN,
                        MId: obj2.Id,
                        HT: obj2.HT,
                        AT: obj2.AT,
                        HD: obj2.HD,
                        AD: obj2.AD,
                        //Pe:mStat[0].Pe,
                        Pe: (mStat[0].Pe == undefined) ? "" : mStat[0].Pe, //mStat[0].CurrentMinute, 
                        //EType : mMatchStat[0].EventType,
                        HTS: HTeamScore,
                        ATS: ATeamScore,
                        Sus: obj2.Sus,
                        Cur: (mStat[0].Cur == undefined) ? "" : mStat[0].Cur, //mStat[0].CurrentMinute,
                        Rem: (mStat[0].Rem == undefined) ? "" : mStat[0].Rem, //mStat[0].RemainingTime,
                        Inf: mStat.Inf,
                        B: false,
                        showList: false,
                        showSubList: false,
                        showMatchDetails: false,
                    });

                    $scope.LMK.push({
                        SId: obj2.SId,
                        SN: obj2.SN,
                        RId: obj2.RId,
                        RN: obj2.RN,
                        CId: obj2.CId,
                        CN: obj2.CN,
                        MId: obj2.Id,
                        HT: obj2.HT,
                        AT: obj2.AT,
                        //Pe:mStat[0].Pe,
                        Pe: (mStat[0].Pe == undefined) ? "" : mStat[0].Pe, //mStat[0].CurrentMinute, 
                        HTS: HTeamScore,
                        ATS: ATeamScore,
                        //Market : obj.Market,
                        MkId: mResult[0].Id,
                        Sus: mResult[0].Sus,
                        Vis: mResult[0].Vis,
                        Cur: (mStat[0].Cur == undefined) ? "" : mStat[0].Cur, //mStat[0].CurrentMinute,
                        Rem: (mStat[0].Rem == undefined) ? "" : mStat[0].Rem, //mStat[0].RemainingTime,  
                        W1SD: w1SelId,
                        XSD: xSelId,
                        W2SD: w2SelId,
                        BW1P: w1Price,
                        BXP: xPrice,
                        BW2P: w2Price,
                        W1P: w1Price,
                        XP: xPrice,
                        W2P: w2Price,
                        B: false,
                        LMX: 0,
                        LBT: 0,
                        // new properties

                    });
                }
                ;
            });

        });

        //console.log($scope.LMKc);
        //console.log($scope.LS);

    // }, function(error) {
    //     //console.log(error);
    // });
    }

    // prematch functions
    function preMatchCnt() {
        $scope.PMc = [];
        for (var i = $scope.PM.length - 1; i >= 0; i--) {
            $scope.PMc.push({
                CId: $scope.PM[i].CId,
                MId: $scope.PM[i].MId,
            });
        }
        ;
        $scope.PM = [];
    }
    ;

    function loadPreMatch() {

        // $http({
        //     method: 'GET',
        //     url: 'http://localhost:8081/PreMatch/GetPrematches'
        // }).then(function(response) {
        // console.log(response);
        // var prematches = JSON.parse(pre_match_data);

        angular.forEach(pre_match_data, function(obj, idx) {
            $scope.PM.push({
                SId: obj.SId,
                SN: obj.SN,
                Dt: obj.Dt,
                RId: obj.RId,
                RN: obj.RN,
                CId: obj.CId,
                CN: obj.CN,
                MId: obj.Id,
                showList: false,
                showSubList: false,
                showMatchDetails: false,
            });
        });

        // }, function(error) {
        //     console.log(error);
        // });

    }

    $scope.getMatchStat = function($event, item) {
        console.log($event.currentTarget);
        alert("getting match stat");
        console.log(item);
        item.showme = true;
        console.log($scope.sample_live_match_stats);


    }


});