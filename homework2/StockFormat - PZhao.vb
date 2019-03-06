'Student Name: Pamela Zhao
'Homework 2 VBA

Sub StockFormat()
    Dim ws As Worksheet
    Dim lastRow As Long
    Dim lastColumn As Integer
    Dim tickerCol As Integer
    Dim yrChangeCol As Integer
    Dim pctChangeCol As Integer
    Dim toalCol As Integer
  
    For Each ws In ActiveWorkbook.Worksheets
        '----This is Moderate Part----
        'Get the last row and last column numbers
        lastRow = ws.Cells(Rows.Count, 1).End(xlUp).Row
        lastColumn = ws.Cells(1, Columns.Count).End(xlToLeft).Column
        
        'Get the column number for summary
        tickerCol = lastColumn + 2
        yrChangeCol = lastColumn + 3
        pctChangeCol = lastColumn + 4
        totalCol = lastColumn + 5
        
        'Populate header for summary
        ws.Cells(1, tickerCol).Value = "Ticker"
        ws.Cells(1, yrChangeCol).Value = "Yearly Change"
        ws.Cells(1, pctChangeCol).Value = "Percent Change"
        ws.Cells(1, totalCol).Value = "Total Stock Volume"
        
        Dim i As Long
        Dim n As Integer
        Dim openPrice As Double
        Dim closePrice As Double
        Dim totalVol As Double
        
        n = 2
        openPrice = 0
        closePrice = 0
        totalVol = 0
        
        For i = 2 To lastRow
            If openPrice = 0 Then
                openPrice = ws.Cells(i, 3).Value
            End If
            If ws.Cells(i, 1).Value <> ws.Cells(i + 1, 1).Value Then

                'Set ticker
                ws.Cells(n, tickerCol).Value = ws.Cells(i, 1).Value

                'Set close price
                closePrice = ws.Cells(i, 6).Value

                'Add to total
                totalVol = totalVol + ws.Cells(i, 7).Value

                'Yearly change
                ws.Cells(n, yrChangeCol).Value = closePrice - openPrice

                'Format background color for yearly change
                If ws.Cells(n, yrChangeCol).Value < 0 Then
                    ws.Cells(n, yrChangeCol).Interior.Color = RGB(250, 0, 0)
                Else
                    ws.Cells(n, yrChangeCol).Interior.Color = RGB(0, 250, 0)
                End If

                'Yearly change percentage
                If closePrice - openPrice <> 0 Then
                    ws.Cells(n, pctChangeCol).Value = (closePrice - openPrice) / openPrice
                Else
                    ws.Cells(n, pctChangeCol).Value = 0
                End If
                
                'Format yearly change percentage
                ws.Cells(n, pctChangeCol).NumberFormat = "0.00%"
                
                'Total volumn
                ws.Cells(n, totalCol).Value = totalVol

                n = n + 1
                openPrice = ws.Cells(i + 1, 3).Value
                closePrice = 0
                totalVol = 0
            Else
                
                totalVol = totalVol + ws.Cells(i, 7).Value
                
            End If
        
        Next i
        
        '----This is Hard Part----
        'Populate header
        ws.Cells(2, totalCol + 3).Value = "Greatest % Increase"
        ws.Cells(3, totalCol + 3).Value = "Greatest % Decrease"
        ws.Cells(4, totalCol + 3).Value = "Greatest Total Volume"
        ws.Cells(1, totalCol + 4).Value = "Ticker"
        ws.Cells(1, totalCol + 5).Value = "Value"
        
        'Get Greatest % increase, Greatest % Decrease and Greatest total volume
        Dim greatestPctInc As Double
        Dim greatestPctDec As Double
        Dim greatestVol As Double
        
        greatestPctInc = 0
        greatestPctDec = 0
        greatestVol = 0
        
        For i = 2 To n
            'Greatest % increase
            If ws.Cells(i, pctChangeCol).Value > greatestPctInc Then
                greatestPctInc = ws.Cells(i, pctChangeCol).Value
                ws.Cells(2, totalCol + 4).Value = ws.Cells(i, tickerCol).Value
                ws.Cells(2, totalCol + 5).Value = Format(greatestPctInc, "0.00%")
            End If
            
            'Greatest % Decrease
            If ws.Cells(i, pctChangeCol).Value < greatestPctDec Then
                greatestPctDec = ws.Cells(i, pctChangeCol).Value
                ws.Cells(3, totalCol + 4).Value = ws.Cells(i, tickerCol).Value
                ws.Cells(3, totalCol + 5).Value = Format(greatestPctDec, "0.00%")
            End If
            
            'Greatest total volume
            If ws.Cells(i, totalCol).Value > greatestVol Then
                greatestVol = ws.Cells(i, totalCol).Value
                ws.Cells(4, totalCol + 4).Value = ws.Cells(i, tickerCol).Value
                ws.Cells(4, totalCol + 5).Value = greatestVol
            End If
            
        Next i
        
        ws.Cells.Columns.AutoFit
        
    Next ws
    
End Sub