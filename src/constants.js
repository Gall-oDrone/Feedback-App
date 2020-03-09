const localhost = 'http://127.0.0.1:8000'
// const localhost = 'https://py3-test-app.herokuapp.com'
const apiURL = '/api'
const apiArticlesURL = '/api/articles'
const imageURL = '/media'
const mediaURL = imageURL

// export const endpoint = `${localhost}`
export const endpoint = `${localhost}${apiURL}`
const image_endpoint = `${localhost}${imageURL}`
const media_endpoint = `${localhost}${mediaURL}`

export const productListURL = `${endpoint}/products/`;
export const productDetailURL = id => `${endpoint}/products/${id}/`;
export const addToCartURL = `${endpoint}/add-to-cart/`;
export const orderSummaryURL = `${endpoint}/order-summary/`;
export const checkoutURL = `${endpoint}/checkout/`;
export const addCouponURL = `${endpoint}/add-coupon/`;
export const countryListURL = `${endpoint}/countries/`;
export const image_URL = `${image_endpoint}/`;
export const userIDURL = `${endpoint}/user-id/`;
export const addressListURL = addressType =>
  `${endpoint}/addresses/?address_type=${addressType}`;
export const addressCreateURL = `${endpoint}/addresses/create/`;
export const addressUpdateURL = id => `${endpoint}/addresses/${id}/update/`;
export const addressDeleteURL = id => `${endpoint}/addresses/${id}/delete/`;
export const orderItemDeleteURL = id => `${endpoint}/order-items/${id}/delete/`;
export const orderItemUpdateQuantityURL = `${endpoint}/order-item/update-quantity/`;

// export const articleURL = articleID => `${endpoint}/articles/${articleID}/comments/`
// export const articleCreateURL = data => `${endpoint}/articles/${data.articleID}/create-comment/`
// export const articleUpdateURL = data => `${endpoint}/articles/${data.articleID}/update-comment/${data.id}/`

export const authLogInURL = `${localhost}/rest-auth/login/`;
export const authSignUpURL = `${localhost}/rest-auth/registration/`;

export const articleCommentsURL = articleID => `${endpoint}/articles/${articleID}/comments/`
export const articleCommentURL = (articleID, commentID) => `${endpoint}/articles/${articleID}/comment/${commentID}/`
export const articleCreateCommentURL = data => `${endpoint}/articles/${data.articleID}/create-comment/`
export const articleUpdateCommentURL = data => `${endpoint}/articles/${data.articleID}/update-comment/${data.id}/`

export const lcroomCreateMeetingURL = `${endpoint}/live-chat/lcrequest/create/`
export const lcroomListURL = username => `${endpoint}/live-chat/lcrequest/lcroom/list/${username}`
export const lcroomDetailURL = roomName => `${endpoint}/live-chat/lcrequest/lcroom/detail/${roomName}`
export const lcroomUserListMeetingURL = username => `${endpoint}/live-chat/lcrequest/userlist/${username}`
export const lcroomUserMeetingReceivedURL = username => `${endpoint}/live-chat/lcrequest/received/userlist/${username}`
export const lcroomBookedURL = username => `${endpoint}/live-chat/lcrequest/booked/userlist/${username}`
export const lcroomListDetailURL =  (articleID, userID) => `${endpoint}/live-chat/lcrequest/listdetail/${articleID}/${userID}`

export const incentivesCreateURL = `${endpoint}/incentives/create/`
export const incentivesListURL = username => `${endpoint}/incentives/userlist/${username}`
export const incentivesDetailURL = userID => `${endpoint}/incentives/listdetail/${userID}`
export const articleDetailURL = articleID => `${endpoint}/articles/${articleID}`

export const profileMeetingRequestURL = username => `${endpoint}/users/lcrequest/${username}`
export const profileArticleListURL = username => `${endpoint}/articles/list/${username}/`
export const profileArticleDetailURL = (articleID, username) => `${endpoint}/articles/${articleID}/detail/${username}/`
export const profileAccountInfoURL = (userId) => `${endpoint}/users/profile/account/info/${userId}`
export const profileURL = (articleID, username) => `${endpoint}/articles/${articleID}/detail/${username}/`
export const profileUserInfoURL = username => `${endpoint}/users/profile/info/${username}`

export const profileAccountUserInfoURL = userID => `${endpoint}/users/profile/account/user/info/${userID}`
export const profileAccountUserInfoUpdateURL = username => `${endpoint}/users/profile/account/user/info/update/${username}`
export const profileAccountUserSurveyListURL = username => `${endpoint}/survey/profile/survey/list/${username}`
export const profileAccountUserSurveyDetailURL = (username, surveyID) => `${endpoint}/survey/profile/survey/detail/${username}/${surveyID}`
export const profileAccountUserSurveyUpdateURL = (username, surveyID) => `${endpoint}/survey/profile/survey/detail/${username}/${surveyID}/update`

export const articleRatingURL = data => `${endpoint}/articles/${data.articleID}/rating/`
export const fetchRatingURL = articleID => `${endpoint}/articles/${articleID}`
export const articleLikeURL = (articleID, userID) => `${endpoint}/articles/${articleID}/likes/${userID}/`
export const fetchLikeCounterURL = (articleID) => `${endpoint}/articles/${articleID}`
export const articleListURL = articleID => `${endpoint}/articles/${articleID}`

export const lcroomReviewURL = `${endpoint}/live-chat/lcrequest/lcroom/review/create/`

export const surveyListURL = `${endpoint}/survey/`
export const surveyDetailURL = id => `${endpoint}/survey/${id}`
export const surveyCreateURL = `${endpoint}/survey/create/`
export const surveyChociesURL = `${endpoint}/survey/choices/`

export const gradedsurveyURL = username => `${endpoint}/surveyApi/graded-survey/?username=${username}`
export const gradedSurveyListURL = `${endpoint}/graded-survey/`
export const gradedSurveyDetailURL = id => `${endpoint}/graded-survey/${id}/`
export const gradedSurveyCreateURL = `${endpoint}/graded-survey/create/`
// export const gradedsurveyCreateURL = `${endpoint}/surveyApi/graded-surveys/create/`
export const gradedSurveyChociesURL = `${endpoint}/graded-survey/choices/`

export const notificationListURL = (username) => `${endpoint}/notifications/list/${username}/`
export const notificationUpdateListURL = username => `${endpoint}/notifications/list/update/${username}/`
export const notificationDetailURL = (notificationID, username)=> `${endpoint}/notifications/${notificationID}/detail/${username}/`
export const notificationUpdateURL = (notificationID, username)=> `${endpoint}/notifications/${notificationID}/detail/update/${username}/`
export const notificationURL = (notificationID, username)=> `${endpoint}/notifications/${notificationID}/detail/delete/${username}/`

export const inquiryListURL = `${endpoint}/inquiries/list/`
export const inquiryDetailURL = (ID)=> `${endpoint}/inquiries/${ID}`
export const inquiryCreateURL = `${endpoint}inquiries/create/`
export const inquiryURL = (notificationID, username)=> `${endpoint}/notifications/${notificationID}/detail/delete/${username}/`

export const inquiryCommentsURL = inquiryID => `${endpoint}/inquiries/${inquiryID}/comments/`
export const inquiryCommentURL = (inquiryID, commentID) => `${endpoint}/inquiries/${inquiryID}/comment/${commentID}/`
export const inquiryCreateCommentURL = data => `${endpoint}/inquiries/${data.inquiryID}/create-comment/`
export const inquiryUpdateCommentURL = data => `${endpoint}/inquiries/${data.inquiryID}/update-comment/${data.id}/`