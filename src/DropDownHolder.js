class DropDownHolder {
  static dropDown;

  static setDropDown(dropDown) {
    this.dropDown = dropDown;
  }

  static getDropDown() {
    return this.dropDown;
  }

  static alert(...theArgs) {
    this.dropDown.alertWithType(...theArgs);
    console.log('alert');
  }
}

export default DropDownHolder;
