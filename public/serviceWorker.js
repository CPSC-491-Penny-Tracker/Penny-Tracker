console.log("service worker line 1")
var cost = 0
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
	if(changeInfo.status == 'complete'){
		console.log(tabId)
		chrome.scripting.executeScript(
			{
				target: {tabId: tabId},
				files: ['script.js']
			},
			(injectionResults) => {
				cost = injectionResults[0].result
				console.log(cost);
			}
		)
	}
});

//chrome.tabs.onUpdated.addListener(() => {console.log('asd')});