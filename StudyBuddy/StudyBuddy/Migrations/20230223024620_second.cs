using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StudyBuddy.Migrations
{
    public partial class second : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Study_User_UserId",
                table: "Study");

            migrationBuilder.DropIndex(
                name: "IX_Study_UserId",
                table: "Study");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Study");

            migrationBuilder.AddColumn<int>(
                name: "StudyId",
                table: "User",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_User_StudyId",
                table: "User",
                column: "StudyId");

            migrationBuilder.AddForeignKey(
                name: "FK_User_Study_StudyId",
                table: "User",
                column: "StudyId",
                principalTable: "Study",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_User_Study_StudyId",
                table: "User");

            migrationBuilder.DropIndex(
                name: "IX_User_StudyId",
                table: "User");

            migrationBuilder.DropColumn(
                name: "StudyId",
                table: "User");

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Study",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Study_UserId",
                table: "Study",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Study_User_UserId",
                table: "Study",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id");
        }
    }
}
