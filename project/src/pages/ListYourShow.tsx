import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Calendar, Clock, MapPin, Image as ImageIcon, Info } from 'lucide-react';
import Button from '../components/ui/Button';

const showSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  category: z.enum(['Movie', 'Concert', 'Sports', 'Theater']),
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  venue: z.string().min(1, 'Venue is required'),
  price: z.string().min(1, 'Price is required'),
  image: z.instanceof(FileList).refine((files) => files.length > 0, 'Image is required'),
  duration: z.string().optional(),
  language: z.string().optional(),
});

type ShowFormData = z.infer<typeof showSchema>;

const ListYourShow: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<ShowFormData>({
    resolver: zodResolver(showSchema)
  });

  const onSubmit = (data: ShowFormData) => {
    console.log(data);
    // Handle form submission
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">List Your Show</h1>
          <p className="text-gray-600 mb-8">
            Fill in the details below to list your show on our platform.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Information */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Show Title
                  </label>
                  <input
                    type="text"
                    {...register('title')}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Enter show title"
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    {...register('description')}
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Describe your show"
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      {...register('category')}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                      <option value="">Select category</option>
                      <option value="Movie">Movie</option>
                      <option value="Concert">Concert</option>
                      <option value="Sports">Sports</option>
                      <option value="Theater">Theater</option>
                    </select>
                    {errors.category && (
                      <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Language (Optional)
                    </label>
                    <input
                      type="text"
                      {...register('language')}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="e.g., English"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Date and Time */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Date and Time</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Calendar className="w-4 h-4 inline-block mr-1" />
                    Date
                  </label>
                  <input
                    type="date"
                    {...register('date')}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  {errors.date && (
                    <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Clock className="w-4 h-4 inline-block mr-1" />
                    Time
                  </label>
                  <input
                    type="time"
                    {...register('time')}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  {errors.time && (
                    <p className="mt-1 text-sm text-red-600">{errors.time.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration (Optional)
                  </label>
                  <input
                    type="text"
                    {...register('duration')}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="e.g., 2h 30m"
                  />
                </div>
              </div>
            </div>

            {/* Venue and Pricing */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Venue and Pricing</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <MapPin className="w-4 h-4 inline-block mr-1" />
                    Venue
                  </label>
                  <input
                    type="text"
                    {...register('venue')}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Enter venue name and address"
                  />
                  {errors.venue && (
                    <p className="mt-1 text-sm text-red-600">{errors.venue.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ticket Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-gray-500">$</span>
                    <input
                      type="text"
                      {...register('price')}
                      className="w-full pl-8 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="0.00"
                    />
                  </div>
                  {errors.price && (
                    <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Image Upload */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Show Image</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <ImageIcon className="w-4 h-4 inline-block mr-1" />
                    Upload Image
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                    <div className="space-y-1 text-center">
                      <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary/80">
                          <span>Upload a file</span>
                          <input
                            type="file"
                            {...register('image')}
                            className="sr-only"
                            accept="image/*"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                  {errors.image && (
                    <p className="mt-1 text-sm text-red-600">{errors.image.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="flex items-center justify-between pt-6">
              <div className="flex items-start text-sm text-gray-500">
                <Info className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                <p>
                  By submitting this form, you agree to our terms and conditions for listing shows.
                </p>
              </div>
              <Button type="submit" size="lg">
                List Show
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ListYourShow;