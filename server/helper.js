module.exports.atRiskIncidents = (incidents) => {
  let thirtyDaysAgo = Date.now() - 2592000000;

  for (let i = 0; i < incidents.length; i++) {
    if (incidents[i].occurred_at * 1000 > thirtyDaysAgo) {
      return true;
    }
  }

  return false;
};

module.exports.filterWeather = (weather) => {
  for (let i = 0; i < weather.minutely.length; i++) {
    if (weather.minutely[i].precipitation !== 0) {
      return weather.minutely[i].dt;
    }
  }

  return false;
};

module.exports.filterTheft = (incidents) => {
  let filtered = [];
  let thirtyDaysAgo = Date.now() - 2592000000;

  for (let i = 0; i < incidents.length; i++) {
    if (incidents[i].occurred_at * 1000 > thirtyDaysAgo && incidents[i].type === 'Theft') {
      filtered.push(incidents[i]);
    }
  }

  return filtered;
};