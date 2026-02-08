# 📝 Portfolio Editing Guide

This guide will help you update your portfolio without any HTML knowledge. Just edit the embedded data in `index.html`!

## 🚀 Quick Start

1. **Open `index.html`** in any text editor (Notepad, TextEdit, VS Code, etc.)
2. **Find the section** that starts with `// Portfolio data - Edit this section to update your portfolio`
3. **Edit the JSON data** between the `const portfolioData = {` and `};`
4. **Save the file** and refresh your browser
5. **That's it!** Your portfolio will update automatically

**Tip:** You can also edit `data.json` and copy the content to the HTML file if you prefer the JSON format.

## 📋 What You Can Edit

### Personal Information

```json
"personalInfo": {
  "name": "Your Name",
  "title": "Your Job Title",
  "email": "your.email@example.com",
  "linkedin": "your-linkedin-profile",
  "location": "Your City, Country",
  "summary": "Your professional summary..."
}
```

### Hero Statistics

```json
"heroStats": [
  {
    "number": "120%",
    "label": "Sales Target Exceeded"
  },
  {
    "number": "28Cr",
    "label": "Revenue Growth"
  }
]
```

### About Section

```json
"about": {
  "paragraphs": [
    "Your first paragraph here...",
    "Your second paragraph here..."
  ],
  "highlights": [
    {
      "icon": "fas fa-chart-line",
      "text": "Your Skill 1"
    },
    {
      "icon": "fas fa-bullseye",
      "text": "Your Skill 2"
    }
  ]
}
```

### Work Experience

```json
"experience": [
  {
    "title": "Your Job Title",
    "company": "Company Name",
    "duration": "Month Year - Present",
    "achievements": [
      "Your achievement 1",
      "Your achievement 2",
      "Your achievement 3"
    ]
  }
]
```

### Education

```json
"education": [
  {
    "degree": "MBA",
    "institution": "University Name",
    "duration": "2022 - 2024",
    "specialization": "Your Specialization",
    "gpa": "CGPA: 3.5/4"
  }
]
```

### Skills

```json
"skills": [
  {
    "category": "Category Name",
    "skills": ["Skill 1", "Skill 2", "Skill 3"]
  }
]
```

### Certificates

```json
"certificates": [
  {
    "title": "Certificate Name",
    "provider": "Provider Name",
    "description": "Certificate description",
    "year": "2023",
    "icon": "fas fa-certificate"
  }
]
```

### Awards

```json
"awards": [
  {
    "title": "Award Name",
    "description": "Award description",
    "icon": "fas fa-trophy"
  }
]
```

## 🎨 Available Icons

You can use any Font Awesome icon. Here are some popular ones:

- `fas fa-trophy` - Trophy
- `fas fa-medal` - Medal
- `fas fa-star` - Star
- `fas fa-award` - Award
- `fas fa-crown` - Crown
- `fas fa-certificate` - Certificate
- `fas fa-chart-line` - Chart
- `fas fa-bullseye` - Target
- `fas fa-users` - Users
- `fas fa-analytics` - Analytics
- `fas fa-language` - Language
- `fas fa-envelope` - Email
- `fas fa-phone` - Phone
- `fab fa-linkedin` - LinkedIn

## 📝 Editing Tips

### 1. **Keep JSON Format**

- Always use double quotes `"` around text
- Separate items with commas `,`
- Don't forget the closing brackets `}`

### 2. **Adding New Items**

- For lists, add a comma after the last item
- Copy the structure of existing items

### 3. **Removing Items**

- Remove the entire item including the comma before it
- Make sure the list still has proper brackets

### 4. **Common Mistakes to Avoid**

- ❌ Don't forget commas between items
- ❌ Don't use single quotes `'` instead of double quotes `"`
- ❌ Don't forget closing brackets `}`
- ❌ Don't add extra commas at the end of lists

## 🔧 Example: Adding a New Job

To add a new job experience:

1. **Find the experience section** in `data.json`
2. **Add a comma** after the last job
3. **Add your new job** like this:

```json
{
  "title": "New Job Title",
  "company": "New Company",
  "duration": "Month Year - Month Year",
  "achievements": [
    "Your first achievement",
    "Your second achievement",
    "Your third achievement"
  ]
}
```

## 🌐 Testing Your Changes

1. **Save the `data.json` file**
2. **Refresh your browser** (F5 or Ctrl+R)
3. **Check if your changes appear**
4. **If there's an error**, check the browser console (F12)

## 🆘 Troubleshooting

### If the page shows "Error Loading Portfolio":

1. **Check your JSON syntax** - make sure all brackets and quotes are correct
2. **Use a JSON validator** online to check your file
3. **Make sure `data.json` is in the same folder** as `index.html`

### If some sections don't update:

1. **Clear your browser cache** (Ctrl+Shift+R)
2. **Check the browser console** for errors (F12)
3. **Make sure you saved the file**

### If you break the JSON:

1. **Copy the original `data.json`** from the backup
2. **Make small changes** and test frequently
3. **Use a text editor** with JSON syntax highlighting

## 📞 Need Help?

If you're having trouble:

1. **Check the browser console** (F12) for error messages
2. **Validate your JSON** at jsonlint.com
3. **Make sure all files** are in the same folder
4. **Try a simple text editor** like Notepad or TextEdit

---

**Happy editing! 🎉** Your portfolio will look great with your updated information.
