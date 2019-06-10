# Student Visualizer

By Sandy Wu 301316914.


## Student Attributes

Student ID - Determined by the database for administrative purposes in ordering who was added first. Cannot be changed.

First Name: Database value of 'name'.

Weight: Max value of 300. Units in pounds (lbs).

Height: Max value of 210. Units in centimetres (cm).

Hair Color: Includes a easy-to-use gradient color picker.

GPA: Lowest 0. Highest 4.33.

Gender: Male or Female or Other.


## Sorting

Can sort students (by ascending order) based on:
- Student ID (ie. by the order of who was most recently added to the database)
- Name (sorts by both first and last name)
- Weight
- Height
- GPA
- Gender


## Circles and Rectangles

Each student is represented by a circle and a rectangle.

The circle represents their head. Each circle is colored with respect to the hair color of the student.

The rectangles represent their body with repect to their proportions as represented by their weight and height. The color of the rectangles are representative of their gender: red for female, blue for male and gold for other.


## The Hoverable Student

Each student has a hoverable tool tip.
The tool tip displays the Full Name, Student ID, and GPA.


## Easy Student-Editing

When editing a student, the user can use the easy drop-down menu to modify a chosen student. Once a student is selected from the dropdown, the "Edit a student" input fields are prepopulated with the current values of that particular student.

Attempts to delete a student will be met with a helpful alert from the window stating that deletes are irreversible. This helps prevent accidental deletes.
