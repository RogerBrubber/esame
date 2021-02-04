class Series{    

    constructor(Code,Title, Description, Category, Image, UsernameFK, EpisodeList) {  
      this.Code = Code;
      this.Title = Title;
      this.Description = Description;
      this.Category = Category;
      this.Image = Image;
      this.UsernameFK = UsernameFK;
      if(EpisodeList)
        this.EpisodeList = EpisodeList;
    }
    static from(json) {
      const s = Object.assign(new Series(), json);
      return s;
  }
  }
  
  module.exports = Series;
  