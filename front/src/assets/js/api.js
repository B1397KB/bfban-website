/**
 * api url
 */

export default class Api {
  constructor() {
    return {
      'search': 'search',
      'cheaters': 'player',
      'captcha': 'captcha',
      'statistics': 'statistics',
      'playerStatistics': 'playerStatistics',
      'users':'users',
      'players': 'players',
      'user_info': 'user/info',
      'user_me': 'user/me',
      'player_judgement': 'player/judgement',
      'user_forgetPassword': 'user/forgetPassword', // 重置请求
      'user_forgetPasswordVerify': 'user/forgetPasswordVerify', // 重置密码验证
      'activity': 'activities',
      'user_bindOrigin': 'user/bindOrigin', // 绑定🍊
      'user_bindOriginVerify': 'user/bindOriginVerify', // 🍊验证
      'user_message': 'message',
      'user_message_mark': 'message/mark',
      'user_reports': 'user/reports',
      'user_changePassword': 'user/changePassword', // 修改密码
      'user_changeName': 'user/changeName', // 修改名称
      'player_banAppeal': "player/banAppeal", // 申诉
      'player_viewBanAppeal': "player/viewBanAppeal",
      'player_unreply': 'player/unreply', // 删除回复
      'player_reply': 'player/reply', // 回复
      'player_report': 'player/report',
      'player_update': 'player/update',
      'player_reset': 'reset',
      'player_viewed': 'player/viewed',
      'account_timeline': 'player/timeline',
      'account_signout': 'user/signout',
      'account_signin': 'user/signin',
      'account_signup': 'user/signup',
      'account_signupVerify': 'user/signupVerify',
      'service_myStorageQuota': 'service/myStorageQuota',
      'service_myFiles':'service/myFiles',
      'service_file':'service/file',
      'service_upload':'service/upload',
      'service_uploadBigFile':'service/uploadBigFile'
    };
  }
}
