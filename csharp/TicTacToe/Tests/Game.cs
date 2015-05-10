using System.Collections.Generic;
using System.Linq;

namespace Tests
{
    public class Game
    {
        public static bool IsOver(IReadOnlyList<char> fields)
        {
            return PlayerTookARow(fields) || 
                   PlayerTookAColumn(fields) || 
                   AllTaken(fields);
        }

        private static bool PlayerTookARow(IReadOnlyList<char> fields)
        {
            for (var i = 0; i < fields.Count(); i += 3)
            {
                if (fields[i] != ' ' && fields[i] == fields[i + 1] && fields[i] == fields[i + 2])
                    return true;
            }
            return false;
        }

        private static bool PlayerTookAColumn(IReadOnlyList<char> fields)
        {
            for (var i = 0; i < 3; i++)
            {
                if (fields[i] != ' ' && fields[i] == fields[i + 3] && fields[i] == fields[i + 6])
                    return true;
            }
            return false;
        }

        private static bool AllTaken(IReadOnlyList<char> fields)
        {
            return !fields.Contains(' ');
        }
    }
}