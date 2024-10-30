export class UIComponents {
  #components;
  constructor(components) {
    this.#components = components;
  }
  Button = (props, options) => this.#components.Button(props, options);
  ButtonGroup = (props, options) => this.#components.ButtonGroup(props, options);
  Checkbox = (props, options) => this.#components.Checkbox(props, options);
  Dropdown = (props, options) => {
    this.#components.Dropdown(props, options);
  };
  MediaPreview = (props, options) => this.#components.MediaPreview(props, options);
  Section = (props, options) => this.#components.Section(props, options);
  Separator = (props) => this.#components.Separator(props);
  TextArea = (props, options) => this.#components.TextArea(props, options);
  TextInput = (props, options) => this.#components.TextInput(props, options);
  NumberInput = (props, options) => this.#components.NumberInput(props, options);
  ColorInput = (props, options) => this.#components.ColorInput(props, options);
  Slider = (props, options) => this.#components.Slider(props, options);
  Library = (props, options) => this.#components.Library(props, options);
  Heading = (props, options) => this.#components.Heading(props, options);
  Text = (props, options) => this.#components.Text(props, options);
  Select = (props, options) => this.#components.Select(props, options);
}
