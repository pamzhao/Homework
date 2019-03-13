# Student: Pamela Zhao
# Homework3: Python Challenge - PyBank

#import os
import csv

#filePath = os.path.join("budget_data.csv")
monthCounts = 0
totalAmt = 0
preValue = 0
changeList = []
dateList = []

with open("budget_data.csv", newline='') as fileHandler:
    fileReader = csv.reader(fileHandler, delimiter=',')
    #Skip the header row
    fileHeader = next(fileReader)
    
    #Get the first row data
    firstRow = next(fileReader)
    preValue = firstRow[1]
    monthCounts += 1
    totalAmt = firstRow[1]

    for row in fileReader:
        monthCounts += 1
        totalAmt = int(totalAmt) + int(row[1])
        changeValue = int(row[1]) - int(preValue)
        changeList.append(changeValue)
        preValue = row[1]
        dateList.append(row[0])

    maxValue = max(changeList)
    minValue = min(changeList)
    maxIndex = changeList.index(maxValue)
    minIndex = changeList.index(minValue)
    avgChange = round(sum(changeList)/len(changeList), 2)
    
#Output on terminal
print("")
print("Financial Analysis")
print("--------------------------------------------------")
print("Total Months: $" + str(monthCounts))
print("Total: $" + str(totalAmt))
print("Average  Change: $" + str(avgChange))
print("Greatest Increase in Profits: " + dateList[maxIndex] + " ($" + str(maxValue) + ")")
print("Greatest Decrease in Profits: " + dateList[minIndex] + " ($" + str(minValue) + ")")
print("")

#Output to text file
with open("budget_result.txt", "w") as textWriter:
    textWriter.write("Financial Analysis\n")
    textWriter.write("--------------------------------------------------\n")
    textWriter.write("Total Months: $" + str(monthCounts) + "\n")
    textWriter.write("Average  Change: $" + str(avgChange) + "\n")
    textWriter.write("Greatest Increase in Profits: " + dateList[maxIndex] + " ($" + str(maxValue) + ")\n")
    textWriter.write("Greatest Decrease in Profits: " + dateList[minIndex] + " ($" + str(minValue) + ")\n")




