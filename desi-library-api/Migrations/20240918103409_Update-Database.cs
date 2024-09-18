using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace desi_library_api.Migrations
{
    /// <inheritdoc />
    public partial class UpdateDatabase : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Books",
                columns:
                    ["Id", "Author", "Borrowed", "Language", "Name", "Pages"],
                values: new object[,]
                {
                    { 1, "Robert C. Martin", false, "English", "Clean Code: A Handbook of Agile Software Craftsmanship", 464 },
                    { 2, "Kent Beck", true, "English", "Test Driven Development: By Example", 240 },
                    { 3, "Erich Gamma; Richard Helm; Ralph Johnson; John Vlissides", false, "English", "Design Patterns: Elements of Reusable Object-Oriented Software", 416 },
                    { 4, "Fred Brooks", false, "English", "The Mythical Man-Month", 336 },
                    { 5, "Gene Kim; Kevin Behr; George Spafford", false, "English", "The Phoenix Project", 423 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
