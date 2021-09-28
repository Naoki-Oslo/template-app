
//<div class="favorite-button">
//  <% if post.favorited_by(current_user) %>
//    <%= link_to post_favorite_path(post.id), method: :delete, remote: true do %>
//      <span>お気に入り</span>
//      <i class="fas fa-star text-red-500"></i>
//      <%= post.favorites.length %>
//    <% end %>
//  <% else %>
//    <%= link_to post_favorites_path(post.id), method: :post, remote: true do %>
//      <span>お気に入り</span>
//      <i class="far fa-star text-gray-500"></i>
//      <%= post.favorites.length %>
//    <% end %>
//  <% end %>
//</div>