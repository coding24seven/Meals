export default function eventifyMealName(allMealNames) {
  allMealNames.forEach(name => {
    name.onkeydown = handleKeyDown;
  });
}

function handleKeyDown(e) {
  const kC = e.keyCode;
  console.log(kC)

  const keys = {
    // enter
    13: function () {
      console.log("enter presed")
    },
    // escape
    27: function () {
      console.log("escape pressed")
    }
  }
  keys.hasOwnProperty(kC) && keys[kC]();
}
