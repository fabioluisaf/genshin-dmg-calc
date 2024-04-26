const IGNORE_REGEXES = [/Cost/, /CD/, /Duration/, /Spiritbreath Thorn/, /Interval/];

function shouldIgnore(talentModeName) {
  let ignore = false;

  IGNORE_REGEXES.forEach(regex => {
    const result = regex.exec(talentModeName);
    
    if(result) {
      ignore = true;
      return
    }
  });

  return ignore;
}

export default shouldIgnore;