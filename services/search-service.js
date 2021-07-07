const orderTasksByKeywords = (taskList, keywordList) => {
    const numberOfKeywords = keywordList.length;

    var taskKeywordMatchingsPairList = [];

    taskList.forEach((task, index) => {
        taskKeywordMatchingsPairList[index] = [task, getKeywordMatchings(task, keywordList)];
    });

    taskKeywordMatchingsPairList = taskKeywordMatchingsPairList.map(pair => [pair[0], pair[1] - numberOfKeywords / 2]);
    
    taskKeywordMatchingsPairList.sort((pair1, pair2) => { 
        if (pair1[1] > pair2[1]) 
            return -1;
        else if (pair1[1] < pair2[1])
            return 1;
        return 0;
    });

    return taskKeywordMatchingsPairList.map(pair => pair[0]);
};

const getKeywordMatchings = (task, keywordList) => {
    var keywordMatchings = 0;
    console.log(task, keywordList);
    keywordList.forEach(keyword => {
        keywordMatchings += ((task.location || "").match(new RegExp(keyword, "g")) || []).length;
        keywordMatchings += ((task.duration || "").toString().match(new RegExp(keyword, "g")) || []).length;
        keywordMatchings += ((task.price || "").toString().match(new RegExp(keyword, "g")) || []).length;
        keywordMatchings += ((task.remote || "").toString().match(new RegExp(keyword, "g")) || []).length;
        keywordMatchings += ((task.start || "").match(new RegExp(keyword, "g")) || []).length;
        keywordMatchings += ((task.job || "").match(new RegExp(keyword, "g")) || []).length;
        keywordMatchings += ((task.context || "").match(new RegExp(keyword, "g")) || []).length;
        keywordMatchings += ((task.mission || "").match(new RegExp(keyword, "g")) || []).length;
    });

    return keywordMatchings;
}

module.exports = orderTasksByKeywords;