# Student: Pamela Zhao
# Homework3: Python Challenge - PyPoll

import csv

#pollCounts = 0
#candidatesDict = {}

with open("election_data.csv", newline='') as fileHandler:
    fileReader = csv.reader(fileHandler, delimiter=',')
    #File header
    fileHeader = next(fileReader)

    #Get the first row data
    firstRow = next(fileReader)
    pollCounts = 1
    #Candidate name as dictionary key and vote count as value
    candidatesDict = {firstRow[2]: 1}

    for row in fileReader:
        pollCounts += 1
        #Candidate in the dictionary key
        if row[2] in candidatesDict:
            count = candidatesDict.get(row[2])
            candidatesDict[row[2]] = count + 1
        #Add the new candidate name to the dictionary
        else:
            candidatesDict[row[2]] = 1

    #Output to terminal
    total = sum(candidatesDict.values())
    print("")
    print("Election Results")
    print("-------------------------")
    print("Total Votes: " + str(total))
    print("-------------------------")
    
    winner = ""
    for name, count in candidatesDict.items():
        percent = round(count/total*100, 2)
        print(name + ": " + str(percent) + "% (" + str(count) + ")")
        if count == max(candidatesDict.values()):
            winner = name
    print("-------------------------")
    print("Winner: " + winner)

    #Output to text file
    with open("election_result.txt", "w") as textWriter:
        textWriter.write("Election Results\n")
        textWriter.write("-------------------------\n")
        for name, count in candidatesDict.items():
            percent = round(count/total*100, 2)
            textWriter.write(name + ": " + str(percent) + "% (" + str(count) + ")\n")
        textWriter.write("-------------------------\n")
        textWriter.write("Winner: " + winner)


    


    
    

    

