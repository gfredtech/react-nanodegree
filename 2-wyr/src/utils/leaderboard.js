export const getCounts = (allUsers, questions) => {
  let answerCount = {};
  let askCount = {};

  // each user's answered count
  allUsers.forEach(u => {
    const count = { [u.id]: 0 };
    questions.forEach(question => {
      const votes = question.optionOne.votes.concat(question.optionTwo.votes);
      if (votes.filter(id => id === u.id).length !== 0) {
        count[u.id]++;
      }
    });
    answerCount = Object.assign({}, answerCount, count);
  });

  allUsers.forEach(u => {
    const count = { [u.id]: 0 };
    questions.forEach(question => {
      if (question.author === u.id) count[u.id]++;
    });
    askCount = Object.assign({}, askCount, count);
  });

  return [answerCount, askCount];
};
