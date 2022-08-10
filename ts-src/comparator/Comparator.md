# Comparators

Comparators are logical operators that compare two Expressions, specifically two expression values at "run time".  
Comparators are strongly coupled to the Data Types of the values they compare, although the coupling is potential 
many to one (a Comparator could be used for more than one Data Type).  The coupling is defined in the [Data Type 
Comparator relationship](../data-type-comparator/DataTypeComparator.md) and can be modified or extended through Options 
by the advanced user.

The Rules Engine defines "Standard Comparators" that are used in comparing the Standard Data Types.  Additional 
[Custom Comparators](../../Customizing.md) can be defined for the Standard Data Types or for new Custom Data Types.

A Comparator consists of a reference name and provided functionality.  The provided functionality is what gives 
meaning to the way the Comparator compares values; unless you are creating Custom Comparators you need not worry 
about that.  The reference name is also the symbol used for the Comparator in the Text Format.



## Standard Comparators

<table>
<thead>
    <tr><th>Comparator</th><th>Symbol (refName)</th><th>Implementation</th></tr>
    <tr><td>Standard Equality</td><td style="text-align: center">=</td><td>Javascript = operator</td></tr>
    <tr><td>Standard Inequality</td><td style="text-align: center">!=</td><td>Javascript != operator</td></tr>
    <tr><td>Standard Greater Than</td><td style="text-align: center">&gt;</td><td>Javascript > operator</td></tr>
    <tr><td>Standard Greater Than Or Equal</td><td style="text-align: center">&gt;=</td><td>Javascript >= 
operator</td></tr>
    <tr><td>Standard Less Than</td><td style="text-align: center">&lt;</td><td>Javascript < operator</td></tr>
    <tr><td>Standard Less Than or Equal</td><td style="text-align: center">&lt;=</td><td>Javascript <= 
operator</td></tr>
    <tr><td>Standard Like Operator</td><td style="text-align: center">~</td><td>Wildcard Search using *</td></tr>
    <tr><td>Standard Earlier Moment</td><td style="text-align: center">m&lt;</td><td>moment.js library</td></tr>
    <tr><td>Standard Now or Earlier Moment</td><td style="text-align: center">m&lt;=</td><td>moment.js library</td></tr>
    <tr><td>Standard Later Moment</td><td style="text-align: center">m&gt;</td><td>moment.js library</td></tr>
    <tr><td>Standard Now or Later Moment</td><td style="text-align: center">m&gt;=</td><td>moment.js library</td></tr>
    <tr><td>Standard Moment Equality</td><td style="text-align: center">m=</td><td>moment.js library</td></tr>
    <tr><td>Standard Moment Inequality</td><td style="text-align: center">m!=</td><td>moment.js library</td></tr>
</thead>
</table>

## Synonyms

Registered Comparator Text Format names are inexorably tied to their registration (the way they are loaded into the 
Rules Engine).  This means that the Standard Equality Comparator is tied to the symbol "=".  However it is possible 
to customize this in three ways.  First, through Options the Standard Comparators can have their symbols altered, 
which has effect them throughout the Rules Engine.  A more sophisticated way is to provide synonyms through the 
Options interface for the Standard Comparators.  Under the covers, this will create a new instance available for use 
and associate it with the specified Data Types, but will not remove the existing one.  Finally, synonyms can also be 
created programmatically.  Through the programatic interface, the Standard Comparators (or any Comparator) can also 
be removed.

// TODO SYNONYMS


