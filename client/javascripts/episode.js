class Episode{    

    constructor(Code,Title,FileAudio,Code_Series_FK,Description, UploadDate, Sponsor,Price,UsernameFK, SeriesTitle) {  
      this.Code = Code;
      this.Title = Title;
      this.Description = Description;
      this.Code_Series_FK = Code_Series_FK;
      this.FileAudio = FileAudio;
      this.UsernameFK = UsernameFK;
      if(Sponsor)
        this.Sponsor = Sponsor;
      this.UploadDate = UploadDate;
      this.Price = Price;
      this.SeriesTitle = SeriesTitle;
     }
}
  
  module.exports = Episode;
  
  
  