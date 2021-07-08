const orderTasksByKeywords = (taskList, keywordList) => {
    const numberOfKeywords = keywordList.length;

    let taskKeywordOccurencesPairList = [];

    taskList.forEach((task, index) => {
        taskKeywordOccurencesPairList[index] = [task, getKeywordOccurences(task, keywordList)];
    });

    taskKeywordOccurencesPairList = taskKeywordOccurencesPairList.map(pair => { // apply criteria formula
        const occurenceList = pair[1];
        const m = occurenceList.filter(keywordOccurence => keywordOccurence[1] > 0).length;
        const o = occurenceList.reduce((occ1, occ2) => occ1 + occ2, 0);
        return [pair[0], m * o - 0.5 * numberOfKeywords * o]
    });
    
    taskKeywordOccurencesPairList.sort((pair1, pair2) => { 
        if (pair1[1] > pair2[1]) 
            return -1;
        else if (pair1[1] < pair2[1])
            return 1;
        return 0;
    });

    return taskKeywordOccurencesPairList.map(pair => pair[0]);
};

const getKeywordOccurences = (task, keywordList) => {
    var keywordOccurences = [];
    keywordList.forEach(keyword => {
        let occurences = 0;
        for (field in task.toObject())
            occurences += ((field || "").toString().match(new RegExp(keyword, "g")) || []).length;
        keywordOccurences.push(occurences);
    });

    return keywordOccurences;
}

module.exports = orderTasksByKeywords;