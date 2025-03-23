using ObjectModel = System.Collections.ObjectModel;

namespace MetalKirikot.Utilities {

    /// <summary>
    /// Overriden System.Collections.ObjectModel.Collection
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public class Collection<T> : ObjectModel.Collection<T> {

        public Collection(params T[] elements) : base(list: elements) { }

        /// <summary>
        /// Method adding multiple elements into collection
        /// </summary>
        /// <param name="elements"></param>
        public void AddRange(params T[] elements) {

            foreach (T element in elements)
                Add(item: element);
        }
    }
}
