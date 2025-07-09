// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-blue; icon-glyph: code;
async function createWidget() {
  let widget = new ListWidget();
  widget.backgroundColor = new Color("#111111"); // Dark code editor background

  // Title bar
  let titleBar = widget.addStack();
  titleBar.layoutHorizontally();
  titleBar.centerAlignContent();
  titleBar.setPadding(1, 1, 1, 1);

  // Window control buttons
  let buttonStack = titleBar.addStack();
  buttonStack.layoutHorizontally();
  buttonStack.spacing = 6;

  const buttonSize = new Size(15, 15);
  const red = buttonStack.addImage(SFSymbol.named("circle.fill").image);
  red.tintColor = new Color("#ff5f57");
  red.imageSize = buttonSize;

  const yellow = buttonStack.addImage(SFSymbol.named("circle.fill").image);
  yellow.tintColor = new Color("#ffbd2e");
  yellow.imageSize = buttonSize;

  const green = buttonStack.addImage(SFSymbol.named("circle.fill").image);
  green.tintColor = new Color("#28c940");
  green.imageSize = buttonSize;

  titleBar.addSpacer();

  // Content
  widget.addSpacer(8)
  widget.spacing = 2;

  const now = new Date();
  const dayString = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthString = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const date = `${monthString[now.getMonth()]} ${now.getDate()}`;

  // Get battery level
  const battery = `${Math.round(Device.batteryLevel() * 100)}%`;

  // Get calender events
  let events = await CalendarEvent.today()

  // Construct final data
  const data = {
    date: date,
    day: dayString[now.getDay()],
    events: events.length,
    battery: battery,
  };

  // Define colors

  // Function to tokenize and render
  function renderSyntaxHighlighted(json, parentWidget) {
    const colors = {
      brace: new Color("D4D4D4"),
      key: new Color("9CDCFE"),
      value: new Color("CE9178"),
      colon: new Color("D4D4D4"),
      comma: new Color("D4D4D4"),
    };

    addColoredLineText("{", colors.brace, parentWidget);

    for (let key in json) {
      let lineStack = parentWidget.addStack();
      lineStack.layoutHorizontally();
      lineStack.setPadding(0, 0, 0, 0);
      lineStack.spacing = 0;
      lineStack.size = new Size(0, 16);

      let keyText = lineStack.addText(`  "${key}"`);
      keyText.font = Font.regularMonospacedSystemFont(11);
      keyText.textColor = colors.key;
      let colonText = lineStack.addText(": ");
      colonText.font = Font.regularMonospacedSystemFont(11);
      colonText.textColor = colors.colon;
      let valueText = lineStack.addText(`"${json[key]}"`);
      valueText.font = Font.regularMonospacedSystemFont(11);
      valueText.textColor = colors.value;
      let commaText = lineStack.addText(",");
      commaText.font = Font.regularMonospacedSystemFont(11);
      commaText.textColor = colors.comma;
    }

    addColoredLineText("}", colors.brace, parentWidget);
  }

  renderSyntaxHighlighted(data, widget);

  return widget;
}

function addColoredLineText(text, color, parentStack) {
  let braceOpen = parentStack.addStack();
  braceOpen.layoutHorizontally();
  braceOpen.setPadding(0, 0, 0, 0);
  braceOpen.spacing = 0;
  braceOpen.size = new Size(0, 16);

  let braceText = braceOpen.addText(text);
  braceText.font = Font.regularMonospacedSystemFont(11);
  braceText.textColor = color;
}

let widget = await createWidget();

if (config.runsInWidget) {
  Script.setWidget(widget);
} else {
  widget.presentSmall();
}

Script.complete();
