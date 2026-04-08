function myRace(promises) {
  // implementation
	return new Promise((resolve, reject) => {
    promises.forEach((p) => {
      Promise.resolve(p)
        .then(resolve)
        .catch(reject);
    });
  });
}

function myAny(promises) {
  // implementation
	return new Promise((resolve, reject) => {
    let rejectedCount = 0;

    promises.forEach((p) => {
      Promise.resolve(p)
        .then(resolve)
        .catch(() => {
          rejectedCount++;
          if (rejectedCount === promises.length) {
            reject("all promises rejected");
          }
        });
    });
  });
}

function myAll(promises) {
  // implementation
	return new Promise((resolve, reject) => {
    let results = [];
    let completed = 0;

    promises.forEach((p, index) => {
      Promise.resolve(p)
        .then((value) => {
          results[index] = value;
          completed++;

          if (completed === promises.length) {
            resolve(results);
          }
        })
        .catch(reject);
    });
  });
}

function myAllSettled(promises) {
  // implementation
	return new Promise((resolve) => {
    let results = [];
    let completed = 0;

    promises.forEach((p, index) => {
      Promise.resolve(p)
        .then((value) => {
          results[index] = {
            status: "fulfilled",
            value: value,
          };
        })
        .catch((error) => {
          results[index] = {
            status: "rejected",
            error: error,
          };
        })
        .finally(() => {
          completed++;
          if (completed === promises.length) {
            resolve(results);
          }
        });
    });
  });
}

module.exports = {
  myRace,
  myAny,
  myAll,
  myAllSettled
};
